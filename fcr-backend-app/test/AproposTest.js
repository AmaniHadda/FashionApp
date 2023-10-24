const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);


describe("Add new - Test Case", () => {
    it("Add new function", function (done) {
      this.timeout(10000);

      chai
        .request("http://127.0.0.1:5002")
        .post("/apropos/createApropos")
        .send({phoneNumber1 : '12345678',phoneNumber2 : '12345678',rue : 'test',ville : 'test',})
        .end(function (err, res) {

          if (err) {
            console.error("Error", err); 
            done(err);
          } else {
            console.log("Res : " + res.text);
            done(); 
          }
        });
    });
  });


  describe("Fetch - Test Case", () => {
    it("Fetch function", function (done) {
      this.timeout(10000);

      chai
        .request("http://127.0.0.1:5002")
        .get("/apropos/getAllApropos")
        .end(function (err, res) {

          if (err) {
            console.error("Error", err); 
            done(err);
          } else {
            console.log("Res : " + res.text);
            done(); 
          }
        });
    });
  });

  
  describe("Fetch - Test Case", () => {
    it("Fetch function", function (done) {
      this.timeout(10000);

      chai
        .request("http://127.0.0.1:5002")
        .get("/apropos/649a22f0b1574118e08d4e82")
        .end(function (err, res) {

          if (err) {
            console.error("Error", err); 
            done(err);
          } else {
            console.log("Res : " + res.text);
            done(); 
          }
        });
    });
  });


