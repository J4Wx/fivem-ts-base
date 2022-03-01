const gulp = require('gulp');
const ts = require('gulp-typescript');
const fs = require('fs');
const path = require('path');
const merge = require('merge-stream');
const concat = require('gulp-concat');
const del = require('del');

gulp.task("build:only", () => {
    const tasks = [];

    const categories = fs.readdirSync('./src/resources', { withFileTypes: true });

    categories.map(category => {
        if (!category.isDirectory()) {
            return null;
        } else {
            category = category.name;
        }

        const resources = fs.readdirSync(path.join('./src/resources', category), { withFileTypes: true });

        resources.map(resource => {
            if (!resource.isDirectory()) {
                return null;
            } else {
                resource = resource.name;
            }

            const resourcePath = `./src/resources/${category}/${resource}/`;
            
            if (fs.existsSync(resourcePath + "__resource.lua")) {
                tasks.push(
                    gulp
                        .src([escapeBracketPath(resourcePath + "**/*.*"), escapeBracketPath("!" + resourcePath + "**/*.ts")])
                        .pipe(gulp.dest(`./resources`))
                );

                if (fs.existsSync(resourcePath + "/server")) {
                    tasks.push(
                        gulp.src(escapeBracketPath(`${resourcePath}/server/**/*.ts`))
                            .pipe(
                                ts({
                                    noImplicitAny: true,
                                    module: "commonjs"
                                })
                            )
                            .pipe(concat("server_main.js"))
                            .pipe(gulp.dest(`./resources/${category}/${resource}/`))
                    );
                };

                if (fs.existsSync(resourcePath + "/client")) {
                    tasks.push(
                        gulp.src(escapeBracketPath(`${resourcePath}/client/**/*.ts`))
                            .pipe(
                                ts({
                                    noImplicitAny: true,
                                    module: "commonjs"
                                })
                            )
                            .pipe(concat("client_main.js"))
                            .pipe(gulp.dest(`./resources/${category}/${resource}/`))
                    );
                };
            }
        });
    });

    return merge(...tasks);
});

gulp.task("build:clean", (cb) => {
    del(["./resources/*"]).then(() => {
        cb();
    });
});

gulp.task('build', gulp.series('build:clean', 'build:only'));

const escapeBracketPath = path =>
  path
    .split("[")
    .map((val, i) => (i != 0 ? `[]${val}` : val))
    .join("[");
