const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("Add new - Test Case", () => {
  it("Add new function", function (done) {
    this.timeout(10000);

    chai
      .request("http://127.0.0.1:5002")
      .post("/api/meetings/")
      .send({
        date: "2023-07-02T00:00:00.000+00:00",
        eventType: "Quotidien",
        coachName: "Mohamed",
        // ville: "test",
        habillements : ["6487c525f562424640cb84a7"]

      })
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
      .get("/api/meetings/")
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
describe("Countbymonth - Test Case", () => {
  it("Countbymonth function", function (done) {
    this.timeout(10000);

    chai
      .request("http://127.0.0.1:5002")
      .get("/api/meetings/countbymonth")
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


describe("Cancel - Test Case", () => {
    it("Cancel function", function (done) {
      this.timeout(10000);
  
      chai
        .request("http://127.0.0.1:5002")
        .put("/api/meetings/cancel/64b96e92ff98de7658f7eca3")
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


  describe("Report - Test Case", () => {
    it("Report function", function (done) {
      this.timeout(10000);
  
      chai
        .request("http://127.0.0.1:5002")
        .put("/api/meetings/report/64b96e92ff98de7658f7eca3")
        .send({otherDates:["2023-07-23T00:00:00.000+00:00","2023-07-22T00:00:00.000+00:00"]})
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




  
