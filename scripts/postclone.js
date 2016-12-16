var fs = require('fs');
var prompt = require('prompt');
var rimraf = require('rimraf');
var exec = require('child_process').exec;

var theme_name,
  class_name,
  github_username,
  seed_theme_name = "yours",
  seed_class_name = "YourTheme",
  seed_demo_property_name = "yourTheme",
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
        askPluginName();
    });
}

function askPluginName() {
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
        generateClassName();
    });
}

function generateClassName() {
    // the classname becomes 'TotalRecall' when theme_name is 'total_recall'
    class_name = "";
    var plugin_name_parts = plugin_name.split("-");
    for (var p in plugin_name_parts) {
        var part = plugin_name_parts[p];
        class_name += (part[0].toUpperCase() + part.substr(1));
    }
    console.log('Using ' + class_name + ' as the TypeScript Class name..');
    renameFiles();
}

function renameFiles() {
    console.log('Will now rename some files..');
    var files = fs.readdirSync(".");
    for (var f in files) {
      var file = files[f];
      if (file.indexOf(seed_theme_name) === 0) {
          var newName = theme_name + file.substr(file.indexOf("."));
          fs.renameSync(file, newName);
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