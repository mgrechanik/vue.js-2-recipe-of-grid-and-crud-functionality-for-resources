# Recipe how to build Grid and CRUD dunctionality over resource in Vue,js 2 application

[Русская версия](docs/README_ru.md)

## Table of contents

* [Goal](#goal)
* [Demo](#demo)
* [Installing demo](#installing)
* [Explanation of structure](#explanation)


---

## Goal <span id="goal"></span>

This recipe shows the plan with which you can build the following functionality:

1. Suppose that at backend you have some resource available to be seen and managed via Rest Api
2. Lets call this resource a model which is the common way with backend to call objects representing rows in the tables
3. Now we need a functionality to see the list of these models and CRUD for them
4. Following this recipe you will have a quick start to run the next functionality of managing models:

    * Model's list page with the next functionality:
	  * the page shows only the models who fits conditions of filtering, sorting and requested pagination page
	  * from the server we load only those model we need for current pagination page  :exclamation: , we do not load all resources from API before work
	  * when conditions to show models on current page changes we make a new request to API for resources needed
	  * sorting row allows to sort table according to column you choose 
	  * filtering row allows to set the condition for models to be seen with function of validation of these filter values
	  * informational tip about amount of shown and found models
	  * pagination to move to the page you need (data is cached, if you loaded page already, it will be taken from cache)
    * Technically module state to serve for our model is kept in the separate **VUEX** module
	* ```CRUD``` makes model managing form to be shown and we can delete model 
	* Everything is easy to be changed for new requirements

---

## Demo <span id="demo"></span>

The **functionality** by default will look like this:
![grid and crud functionality for resource](https://raw.githubusercontent.com/mgrechanik/vue.js-2-recipe-of-grid-and-crud-functionality-for-resources/master/docs/images/grid-and-crud.png "grid and crud functionality for resource")
	
---
    
## Установка демо <span id="installing"></span>

Клонируйте репозитарий

```
git clone git@github.com:mgrechanik/vue.js-2-recipe-of-grid-and-crud-functionality-for-resources.git
```

Выполните
```
npm install
```

Запускаем RestAPI с базой для нашего приложения
```
json-server --watch ./db/crud_db.json
```

Это даст нам два ресурса по следующим адресам:

```
  Resources
  http://localhost:3000/omegas
  http://localhost:3000/profiles
```
> Если у вас адреса будут другие , настройте их в ```_moduleSettings.js``` у каждого модуля, подробности ниже.

Запускайте приложение

```
npm run serve
```

Теперь вы будете видеть соответствующие grid-ы с crud функционалом

---

## Explanation of structure  <span id="explanation"></span> 

В деталях сборки вы можете ознакомиться в рабочем demo примере.

Основные моменты такие:

1) Функционал относительно **vuex** части модуля располагается в ```src/store/имяМодуля.js```.

Функционал компонентов модуля располагается в ```src/components/crud/имяМодуля/```.

2) В сборке присутствует модуль **omega** - это базовый модуль, от которой наследуется весь функционал.

Этот модуль должен присутствовать в вашей сборке, скопируйте его себе. На базе него будем создавать уже свои.

3) Модуль **profile** в сборке - как раз пример как можно создать свой собственный модуль, отнаследовав ее от соответствующего функционала **omega**.


### Список шагов, необходимых для создания своей модели и модуля для нее  <span id="steps"></span>

Допустим, мы назовем нашу модель **zeta** , и соответствующий модуль также.

1) копируем ```components/crud/profile``` в ```components/crud/zeta```

2) Часть, касаемая vuex модуля (каталог src/store)

    - ```profile.js``` копируем в ```zeta.js```
	   * В ```zeta.js```
	     - меняем на свои колонки фильтровки и сортировки (те, по которым в новой модели требуется)
	- добавляем в ```store/index.js```
	```
		import zeta from './zeta'
		import * as ZETA_SETTINGS from '@/components/crud/zeta/_moduleSettings';

		zeta.state.settings = ZETA_SETTINGS;

		modules: {
			omega,
			profile,
			zeta
		}
		```
		
3) меняем в каталоге ```components/crud/zeta```

- ```_moduleSettings.js```
  - настройки для данной модели (подробно объяснены в самом файле)
  
- ```EditForm.vue```
```
  - свои колонки
    - шаблон
	- 
	data: function() {
			return {
				model: {
```		
		
- ```FilterRow.vue```
```
    - шаблон
	
	-
	data: function() {
		return {
			filter: {	
```	

		
- ```GridView.vue```
  - шаблон

- ```TitleAndSortRow.vue```
```
   - шаблон
   -
	data: function() {
		return {
			sort: {    
```

- Инициализацию добавить 
  - в App.vue
  ```
    this.$store.dispatch("zeta/initializeAction", this.$store);    
    this.$store.dispatch("zeta/setPageAction", 1);     
  ```	
  - или во вьюхе у роутера
  
4) Добавляем эти компоненты на нужные страницы, пример как в роутере подключили, смотри в Демо.  

### Возможности по расширению  <span id="extending"></span>

По модулю **profile** вы можете видеть что создавая свой модуль на основе базового - **omega** - мы в основном
решали задачи по:
- настройке модуля в ```_moduleSettings```
- настройке колонок
- изменению шаблонов в компонентах

Логику в компонентах менять не потребовалось, но в этом также нет проблем, компоненты наследуются по правилам **Vue** с соответствующими
возможностями переопределения, также ничто не мешает использовать свои собственные компоненты.
