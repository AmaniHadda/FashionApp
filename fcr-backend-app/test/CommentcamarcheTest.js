const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);


describe(" -------------------- Find all   - Test Case -------------------- ", () => {
    it("Fetch all  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/ccmarche/getcommentcamarche")
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
describe(" -------------------- Add ccm   - Test Case -------------------- ", () => {
    it("Add function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .post("/ccmarche")
        .send({title:"testBaher",descriptions:["testTest"]})
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
describe(" -------------------- Update - Test Case -------------------- ", () => {
    it("Update function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .put("/ccmarche/updatecommentcamarche/64c184ae00bc4a3abcd3bb41")
        .send({title:"Comment devenir un parrain ?",descriptions:["testTest"]})
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