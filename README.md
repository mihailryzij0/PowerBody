

### <div align="center">Приложение "PowerBody" </div>  

  [![Sanity Check](https://github.com/mihailryzij0/PowerBody/actions/workflows/sanity-check.yml/badge.svg?branch=final-task)](https://github.com/mihailryzij0/PowerBody/actions/workflows/sanity-check.yml)
   [![Sanity Check](https://github.com/mihailryzij0/PowerBody/actions/workflows/firebase-hosting-pull-request.yml/badge.svg?branch=final-task)](https://github.com/mihailryzij0/PowerBody/actions/workflows/firebase-hosting-pull-request.yml)

На создание проекта меня побудила моя любовь к занятию спортом. В приложение я постарался максимально реализовать свою идею.    
  
В приложении реализовано:  
  
- ⚡ PWA, SPA  
  
- ⚡ Авторизация  
  
- ⚡Работа offline    
  
- ⚡ Комментарии к постам    
  
- ⚡ Фильтрация постов   
  
- ⚡ Создание постов   
  
- ⚡ Рейтинг тренировок   
  
- ⚡ Генератор тренировок   
  
- ⚡ Создание своей тренировки   
  
В приложении все страницы приватны, для просмотра приложения необходимо зарегистрироваться. Если зайти на страницу с постами как администратор, в правом нижнем углу появится кнопка, при клике на которую вы будете направлены на страницу с формой для создания тренировки или курса анаболиков.  
  

 Добавить тренировку в личный кабинет можно тремя способами: создать свою, выбрать из списка авторских постов, либо в генераторе тренировок. Генератор тренировок создает комплекс с постоянной периодизацией упражнений, рассчитанный  на полтора месяца с тремя тренировочными днями в неделю.  
  

В процессе написания программы я понял, что загруженные фотографии весят слишком много, и для решения этой проблемы решил их обрезать с помощью библиотеки "react-easy-crop", фотографии можно загружать в профиле как аватар и на странице для создания постов.  
  

  В offline режиме пользователь не сможет войти в систему и попасть на страницу поста, но все остальные функции остаются для него доступными. После прохождения тренировки всплывает модальное окно с просьбой оценить тренировку.   
  

Оценить тренировку можно на странице самой тренировки, в генераторе тренировок и в личном кабинете после прохождения комплекса.  
  

## Запустить проект.  
  
- npm i  
  
- npm run build  
  
- npm run start /или/ npm run dev (в этом случае service worker не подключится, я его отключил в режиме development из-за конфликтов с devServer )  
  
<div align="center">  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/javascript-original.svg" alt="JavaScript" height="50" />  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/typescript-original.svg" alt="TypeScript" height="50" />  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" height="50" />  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/redux-original.svg" alt="Redux" height="50" />  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/webpack-original.svg" alt="Webpack" height="50" />  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/sass-original.svg" alt="Sass" height="50" />  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" height="50" />  
</div>   

Ссылка на проект: https://powerbody-6330f.web.app/
