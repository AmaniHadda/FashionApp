const chai = require("chai");
let chaiHttp = require("chai-http");

chai.use(chaiHttp);



  describe(" -------------------- Find all   - Test Case -------------------- ", () => {
    it("Fetch all  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/banner/getbanner")
      //  .set('Authorization','Bearer'+authToken)
        .end(function (err, res) {
          if (err) {
            console.log(err.text);
          } else {
            console.log(res.text);
            done();
          }
        });
    });
  });

  describe(" -------------------- Ajouter une bannière - Cas de test -------------------- ", () => {
    it("Fonction d'ajout de nouvelle bannière", function (done) {
      this.timeout(10000);
  
      const fs = require("fs");
      const path = require("path");
      const imageFilePath = path.join(__dirname, "test.jpg");
  
      chai
        .request("http://127.0.0.1:5002")
        .post("/banner/addbanner")
        .field("description1", "baherTest1")
        .field("description2", "baherTest2")
        .field("description3", "baherTest3")
        .attach("image", fs.readFileSync(imageFilePath), "test.jpg")
        .end(function (err, res) {
          if (err) {
            console.error("Erreur", err);
            done(err);
          } else {
            console.log("Réponse : " + res.text);
            done();
          }
        });
    });
  });

  
