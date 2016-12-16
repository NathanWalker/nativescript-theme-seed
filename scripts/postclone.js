var fs = require('fs');
var prompt = require('prompt');
var rimraf = require('rimraf');
var exec = require('child_process').exec;

var theme_name,
  class_name,
  github_username,
  seed_theme_name = "yours",
  seed_custom_name = "custom",
  seed_github_username = "YourName",
  init_git;

console.log('NativeScript Theme Seed Configuration');
prompt.start();
askGithubUsername();

function askGithubUsername() {
    prompt.get({
        name: 'github_username',
        description: 'What is your GitHub username (used for updating package.json)? Example: NathanWalker / EddyVerbruggen'
    }, function (err, result) {
        if (err) {
            return console.log(err);
        }
        if (!result.github_username) {
            return console.log("Dude, the GitHub username is mandatory!");
        }
        github_username = result.github_username;
        askThemeName();
    });
}

function askThemeName() {
    prompt.get({
        name: 'theme_name',
        description: 'What will be the name of your theme? Use lowercase characters and dashes only. Example: nova / retro / total_recall'
    }, function (err, result) {
        if (err) {
            return console.log(err);
        }
        if (!result.theme_name) {
            return console.log("Dude, the theme name is mandatory!");
        }
        theme_name = result.theme_name;
        renameFiles();
    });
}

function renameFiles() {
    console.log('Will now rename some files..');
    var files = fs.readdirSync("app/");
    for (var f in files) {
      var file = files[f];
      if (file.indexOf(seed_theme_name) === 0 || file.indexOf('scss/_custom') > -1) {
          var newName = theme_name + file.substr(file.indexOf("."));
          fs.renameSync('app/' + file, 'app/' + newName);
      }
    }
    files = fs.readdirSync("app/scss/");
    for (var f in files) {
      var file = files[f];
      if (file.indexOf('custom') > -1) {
          var newName = 'app/scss/_' + theme_name + '.scss';
          fs.renameSync('app/scss/' + file, newName);
      }
    }
    files = fs.readdirSync(".");
    for (var f in files) {
      var file = files[f];
      if (file.indexOf(seed_theme_name) > -1) {
          var newName = 'nativescript-theme-' + theme_name + file.substr(file.indexOf("."));
          fs.renameSync(file, newName);
      }
    }

    adjustFiles();
}

function adjustFiles() {
    console.log('Adjusting files..');

    // add all files in the root
    var files = fs.readdirSync(".");

    // add the demo files
    var demoFiles = fs.readdirSync("app/");
    for (var d in demoFiles) {
        var demoFile = demoFiles[d];
        if (demoFile.indexOf('app.ts') > -1 || demoFile.indexOf('main-page.ts') > -1 || demoFile.indexOf('ios.scss') > -1 || demoFile.indexOf('android.scss') > -1) {
            files.push("app/" + demoFile);
        }
    }
    var scriptFiles = fs.readdirSync("scripts/");
    for (var d in scriptFiles) {
        var demoFile = scriptFiles[d];
        if (demoFile.indexOf('builder.js') > -1) {
            files.push("scripts/" + demoFile);
        }   
    }

    // prepare and cache a few Regexp thingies
    var regexp_seed_theme_name = new RegExp(seed_theme_name, "g");
    var regexp_seed_custom_import = new RegExp(seed_custom_name, "g");
    var regexp_seed_github_username = new RegExp(seed_github_username, "g");

    for (var f in files) {
      var file = files[f];
      if (file.indexOf(".") > 0) {
        var contents = fs.readFileSync(file, 'utf8');
        var result = contents.replace(regexp_seed_theme_name, theme_name);
        result = result.replace(regexp_seed_custom_import, theme_name); 
        result = result.replace(regexp_seed_github_username, github_username);
        fs.writeFileSync(file, result);
      }
    }

    initGit();
}

function initGit() {
    prompt.get({
        name: 'init_git',
        description: 'Do you want to init a fresh local git project? If you previously \'git clone\'d this repo that would be wise (y/n)',
        default: 'y'
    }, function (err, result) {
        if (err) {
            return console.log(err);
        }
        if (result.init_git && result.init_git.toLowerCase() === 'y') {
            rimraf.sync('.git');
            exec('git init -q .', function(err, stdout, stderr) {
                if (err) {
                    console.log(err);
                } else {
                    exec("git add '*' '.*'", function(err, stdout, stderr) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        }
        console.log("Configuration finished! If you're not happy with the result please clone the seed again and rerun this script.");
        console.log("You can now start building your theme!");
    });
}