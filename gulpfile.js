var gulp = require('gulp'), // подключаем пакеты Gulp из папки node_modules в наш проект
    less = require('gulp-less'), // Подключаем Less пакет
    watch = require('gulp-watch'), // Подключаем watch пакет
    browserSync = require('browser-sync'), // Подключаем browser-sync пакет
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    concat = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)

gulp.task('less', function () { // Создаем таск "sass"
  return gulp.src('app/less/**/*.less') // Берем все Less-файлы из папки less и дочерних, если таковые будут
    .pipe(less()) // Преобразуем less в CSS посредством gulp-less
    .pipe(gulp.dest('./app/css')) // Выгружаем результата в папку app/css
    .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
  browserSync({ // Выполняем browser Sync
    server: { // Определяем параметры сервера
      baseDir: 'app' // Директория для сервера - app
    },
    notify: false // Отключаем уведомления
  });
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('watch', ['browser-sync', 'less'], function () {
  gulp.watch('app/less/**/*less', ['less']); // Наблюдение за less-файлами
  gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
  gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
    //add watch for Наблюдения за другими типами файлов
});
