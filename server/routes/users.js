const express = require('express');
const router = express.Router();
const fs = require('fs');
const hospitalPath = '../server/data/hospitals.json';
const departmentsPath = '../server/data/Departments.json';



const readFileHospital = (
  callback,
  returnJson = false,
  filePath = hospitalPath,
  encoding = 'utf8'
) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      throw err;
    }
    callback(returnJson ? JSON.parse(data) : data);
  });
};

const readFileDepartment = (
  callback,
  returnJson = false,
  filePath = departmentsPath,
  encoding = 'utf8'
) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      throw err;
    }
    callback(returnJson ? JSON.parse(data) : data);
  });
};

const writeFileHospital = (
  fileData,
  callback,
  filePath = hospitalPath,
  encoding = 'utf8'
) => {
  fs.writeFile(filePath, fileData, encoding, err => {
    if (err) {
      throw err;
    }

    callback();
  });
};

 // CREATE
 router.post('/addHospital', (req, res) => {
  readFile(data => {
    // add the new user
      data = req.body;
      writeFileHospital(JSON.stringify(data, null, 2), () => {
          res.status(200).send('new user added');
      });
  },
      true);
});

    // UPDATE
    router.put('/updateHospital/:name', (req, res) => {
      readFileHospital(data => {
          // add the new user
          const hospital = req.params["name"];
          data[hospital] = req.body;

          writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send(`users id:${hospital} updated`);
          });
      },
          true);
  });


  // DELETE Hospital
  router.delete('/deleteHospital/:hospitalname', (req, res) => {
      readFileHospital(data => {
          // add the new user
          const hospital = req.params["hospitalname"];
          // const result = data.filter(d=>d.hospital==`${hospital}`);
          const deleteObj = (data, column, search) => {
            let result = data.filter(m => m[column] !== search);
            return result;
          }
          
          const deleted = deleteObj(data, 'hospitalname', `${hospital}`);
          console.log(deleted);

          writeFileHospital(JSON.stringify(data, null, 2), () => {
              res.status(200).send(`Hospital Name :${hospital} removed`);
          });
      },
          true);
  });

   // DELETE
   router.delete('/deleteDepartment/:dname', (req, res) => {
    readFileHospital(data => {
        // add the new user
        const dname = req.params["dname"];
        // const result = data.filter(d=>d.hospital==`${hospital}`);
        const deleteObj = (data, column, search) => {
          let result = data.filter(m => m[column] !== search);
          return result;
        }
        
        const deleted = deleteObj(data, 'departmentname', `${dname}`);
        console.log(deleted);

        writeFileHospital(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`Hospital Name :${hospital} removed`);
        });
    },
        true);
});


//get list of Hospitals from data/hospitals.json file.
router.get("/listOfHospitals", (req,res, next) => {
  readFileHospital(data => {
    res.send(data);
  }, true);
});

// Get list of departments from data/Departments.json file.
router.get("/departments", (req,res, next) => {
  readFileDepartment(data => {
    res.send(data);
  }, true);
});

// Get list of departments from data/Departments.json file.
router.get("/filteredDepartments/:hospitalname", (req,res, next) => {
  const hospitalname =  req.params.hospitalname;
  console.log(hospitalname)
  readFileDepartment(data => {
const result = data.filter(d=>d.hospitalname==`${hospitalname}`)
    res.send(result);
  }, true);
});




module.exports = router;
