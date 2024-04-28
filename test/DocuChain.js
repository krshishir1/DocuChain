const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DocuChain Functionality", function () {
  let addresses = null;
  let contract = null;

  beforeEach(async function () {
    let [owner, student, verifer] = await ethers.getSigners();
    addresses = [owner, student, verifer];
    contract = await ethers.deployContract("DocuChain", []);
  });

  it("check existence of student details in the contract", async function () {
    const [owner, student, verifier] = addresses;

    const sContract = await contract.connect(student);

    const response1 = await sContract.isStudentExists();
    await contract
      .connect(student)
      .addStudentDetails("John Doe", "john@gmail.com", "male");
    const response2 = await sContract.isStudentExists();

    expect(response1).to.equal(false);
    expect(response2).to.equal(true);

    const [sAddress, name, email] = await sContract.getStudentDetails();
    console.log("Details of the student: ", sAddress, name, email);
  });

  it("check existence of verifier details in the contract", async function () {
    const [owner, student, verifier] = addresses;

    const vContract = await contract.connect(verifier);

    const response1 = await vContract.isVerifierExists(verifier.address);
    await vContract.addVerifierDetails(
      "Saint Joseph School",
      "example@co.in",
      "school",
      "Bhagalpur",
      "random-cid"
    );
    const response2 = await vContract.isVerifierExists(verifier.address);

    expect(response1).to.equal(false);
    expect(response2).to.equal(true);

    const [address, name, email] = await vContract.getVerifierDetails(
      verifier.address
    );
    console.log("Details of the student: ", address, name, email);
  });

  it("adding document to the blockchain", async function () {
    const [owner, student, verifier] = addresses;

    const sContract = await contract.connect(student);
    const vContract = await contract.connect(verifier);

    await sContract.addStudentDetails("John Doe", "john@gmail.com", "male");

    await sContract.addDocumentDetails(
      "c14850f4d6da0e87622122d35c1bd379",
      "Merit Certificate",
      "certificate",
      verifier.address,
      student.address
    );

    await sContract.addDocumentDetails(
      "6baa6e2decc2df28b5e0ffe627febbe4",
      "Domicile Certificate",
      "certificate",
      verifier.address,
      student.address
    );

    // const [docId, docName, docType, vAddress, sAddress] =
    //   await sContract.getDocumentDetails("c14850f4d6da0e87622122d35c1bd379");

    // expect(docId).to.not.equal("");

    // console.log(await sContract.documentHashes(1))

    const documents = await vContract.getDocumentsForStudent();

    documents.forEach(async (doc) => {
      const [docId, docName, docType, vAddress, sAddress] = doc;
      console.log(
        "Details of the document: ",
        docId,
        docName,
        docType,
        vAddress,
        sAddress
      );
    });

    // console.log(
    //   "Details of the document: ",
    //   docId,
    //   docName,
    //   docType,
    //   vAddress,
    //   sAddress
    // );
  });

  it("gets list of all verifiers", async function () {
    const [owner, student, verifier] = addresses;

    const vContract = await contract.connect(verifier);
    const sContract = await contract.connect(student);

    await vContract.addVerifierDetails(
      "Saint Joseph School",
      "example@co.in",
      "school",
      "Bhagalpur",
      "random-cid"
    );

    await sContract.addVerifierDetails(
      "JSS Academy",
      "example@co.in",
      "school",
      "Noida",
      "random-cid"
    );

    await contract.addVerifierDetails(
      "Boring School",
      "example@co.in",
      "school",
      "Bhagalpur",
      "random-cid"
    );

    const verifiers = await contract.getAllVerifiers();
    console.log("List of all verifiers: ", verifiers);
  });
});
