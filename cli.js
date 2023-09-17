const fs = require('fs');
const readline = require('readline');
const { program } = require('commander');

program
  .command('make:controller <name>')
  .description('Create a controller, router, and model file')
  .action((name) => {
    const controllerPath = `controllers/${name}.controller.js`;
    const routerPath = `routes/${name}.router.js`;
    const modelPath = `models/${name}.model.js`;

    // Check if the controllers directory exists
    if (!fs.existsSync('controllers')) {
      fs.mkdirSync('controllers');
    }

    // Check if the routes directory exists
    if (!fs.existsSync('routes')) {
      fs.mkdirSync('routes');
    }

    // Check if the models directory exists
    if (!fs.existsSync('models')) {
      fs.mkdirSync('models');
    }

    // Check if controller file already exists
    if (fs.existsSync(controllerPath)) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(`Controller file "${controllerPath}" already exists. Do you want to override it? (Y/N) `, (answer) => {
        if (answer.trim().toLowerCase() === 'y') {
          generateController();
        } else {
          console.log(`Skipping creation of controller file "${controllerPath}".`);
        }
        rl.close();
      });

    } else if (fs.existsSync(routerPath)) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(`Router file "${routerPath}" already exists. Do you want to override it? (Y/N) `, (answer) => {
        if (answer.trim().toLowerCase() === 'y') {
          generateController();
        } else {
          console.log(`Skipping creation of router file "${routerPath}".`);
        }
        rl.close();
      });

    } else if (fs.existsSync(modelPath)) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(`Model file "${modelPath}" already exists. Do you want to override it? (Y/N) `, (answer) => {
        if (answer.trim().toLowerCase() === 'y') {
          generateController();
        } else {
          console.log(`Skipping creation of model file "${modelPath}".`);
        }
        rl.close();
      });

    } else {
      generateController();
    }

    function generateController() {
      const controllerContent = `
      class ${name}Controller {
        // Define your common functions here
        index(req, res) {
          try {
            // Implementation for index
            res.send('Controller ${name}: Index');
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        }
       
        create(req, res) {
          try {
            // Implementation for create
            res.send('Controller ${name}: Create');
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        }
       
        show(req, res) {
          try {
            // Implementation for show
            res.send('Controller ${name}: Show');
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        }
       
        update(req, res) {
          try {
            // Implementation for update
            res.send('Controller ${name}: Update');
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        }
       
        delete(req, res) {
          try {
            // Implementation for delete
            res.send('Controller ${name}: Delete');
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        }
      }
      
      module.exports = new ${name}Controller();
      `;

      fs.writeFileSync(controllerPath, controllerContent);
      console.log(`Controller file created: ${controllerPath}`);

      const routerContent = `
      const express = require('express');
      const router = express.Router();
      const ${name}Controller = require('../controllers/${name}.controller');

      router.get('/', ${name}Controller.index);
      router.post('/', ${name}Controller.create);
      router.get('/:id', ${name}Controller.show);
      router.put('/:id', ${name}Controller.update);
      router.delete('/:id', ${name}Controller.delete);

      module.exports = router;
      `;

      fs.writeFileSync(routerPath, routerContent);
      console.log(`Router file created: ${routerPath}`);

      const modelContent = `

      const mongoose = require('mongoose');

      const ${name}Schema = new mongoose.Schema({
        // Define your model schema here
      });

      const ${name}Model = mongoose.model('${name}', ${name}Schema);

      module.exports = ${name}Model;
      `;

      fs.writeFileSync(modelPath, modelContent);
      console.log(`Model file created: ${modelPath}`);
    }
  });

program.parse(process.argv);