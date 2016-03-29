#My To Do List App
This program is a simple to do list app where you can basically create folders to categorize your lists and add list of tasks.

##Dependencies:
- Ionic Framework
- AngularJS
- NPM
- bower
- gulp

##Installation:
1. Download the zip file.
2. Create a project folder and extract files.
3. Run npm install and bower install.
4. Open cmd and run 'ionic server' (ionic must be running globally).

##Features: 
CRUD - Create, Read, Update, Delete

1. CRUD of folders.
2. CRUD of lists.
3. CRUD of tasks.
4. Setting of tasks to complete.
5. Persists data on the phone. (using localstorage)
6. User Registration
7. User Login
8. User Ownership of folders

##Usage:
1. Open the sidemenu and add a folder 
.- http://screencast.com/t/fqwMozWMj
2. Open the folder and add a list
.-http://screencast.com/t/skxTXdnS
.-http://screencast.com/t/fiz5ilWE
3. Add tasks to your list.
.-http://screencast.com/t/siF9d6zUVko
4. To edit and delete lists and tasks, simply swipe the item you want to edit/delete toward the left of the screen and the options will show.
.-http://screencast.com/t/9B7cCRaZ
5. To set a task to complete, simply click on the task to toggle complete/incomplete.
.-http://screencast.com/t/Mwb9NYz4

##App Icon and Splash Screen
Along with the code, I have create a simple app icon and splash screen image(stored on the /resources folder). To use them, simply add a platform e.g. 'cordova platform add ios' and then run 'ionic resources'. Ionic will then automatically generate icons and splashscreens for all existing platforms.

##Testing:
Due to limited resources, the app was only tested using two android devices running on version 4.2. The results of the testing was quite good. The app works as is supposed to work (Please report any bug if you've seen any).