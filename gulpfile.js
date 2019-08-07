const gulp = require("gulp");

gulp.task("default", async () => {
  const src = gulp.src("./build/callback/index.html");
  await src.pipe(gulp.dest("./build/oauth/callback/"));
});
