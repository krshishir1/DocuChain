// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocuChain {
    struct Student {
        address studentAddress;
        string fullName;
        string email;
        string gender;
        // string dob;
        // string qualification;
        // string degree;
        // string university;
        // string startDate;
        // string endDate;
        // string gpa;
        // string percentage;
    }

    struct Verifier {
        address verifierAddress;
        string name;
        string email;
        string instituteType;
        string location;
        string logoCid;
    }

    struct Document {
        string cid;
        string docName;
        string docType;
        string purpose;
        address verifierAddress;
        address studentAddress;
        VerificationStatus status;
    }

    enum VerificationStatus {
        Pending,
        Verified,
        Rejected
    }

    mapping(address => Student) students;
    mapping(string => Document) documents;
    mapping(address => Verifier) verifiers;

    string[] public documentHashes;
    address[] public verifiersList;

    // Functions to handle Documents in blockchain
    /* 
        1) Check if student details are added
        2) Check if document is already available
        3) Adding the document
    */

    function addDocumentDetails(
        string memory _cid,
        string memory _name,
        string memory _docType,
        string memory _purpose,
        address _verifierAddress,
        address _studentAddress
    ) public {
        require(
            students[msg.sender].studentAddress != address(0),
            "Student details not added"
        );

        require(!isDocumentExists(_cid), "Document already added");

        documentHashes.push(_cid);

        documents[_cid] = Document(
            _cid,
            _name,
            _docType,
            _purpose,
            _verifierAddress,
            _studentAddress,
            VerificationStatus.Pending
        );
    }

    function getDocumentsForVerifier() public view returns (Document[] memory) {
        Document[] memory verifierDocuments = new Document[](
            documentHashes.length
        );

        uint256 count = 0;

        for (uint256 i = 0; i < documentHashes.length; i++) {
            string memory hash = documentHashes[i];
            Document memory doc = documents[hash];

            if (doc.verifierAddress == msg.sender) {
                verifierDocuments[count] = doc;
                count++;
            }
        }

        assembly {
            mstore(verifierDocuments, count)
        }

        return verifierDocuments;
    }

    function getDocumentsForStudent() public view returns (Document[] memory) {
        Document[] memory studentDocuments = new Document[](
            documentHashes.length
        );

        uint256 count = 0;

        for (uint256 i = 0; i < documentHashes.length; i++) {
            string memory hash = documentHashes[i];
            Document memory doc = documents[hash];

            if (doc.studentAddress == msg.sender) {
                studentDocuments[count] = doc;
                count++;
            }
        }

        assembly {
            mstore(studentDocuments, count)
        }

        return studentDocuments;
    }

    function getDocumentDetails(
        string memory _cid
    ) external view returns (Document memory) {
        require(isDocumentExists(_cid), "Document not found");
        return documents[_cid];
    }

    function verifyDocument(
        string memory _cid,
        VerificationStatus _status
    ) public {
        require(isDocumentExists(_cid), "Document not found");
        require(isVerifierExists(msg.sender), "Verifier not found");
        require(
            documents[_cid].verifierAddress == msg.sender,
            "Verifier not authorized"
        );

        documents[_cid].status = _status;
    }

    function deleteDocument(string memory _cid) public {
        require(isDocumentExists(_cid), "Document not found");
        require(isStudentExists(), "Student not found");
        require(
            documents[_cid].studentAddress == msg.sender,
            "Student not authorized"
        );

        delete documents[_cid];
    }

    function isDocumentExists(string memory _cid) public view returns (bool) {
        return bytes(documents[_cid].cid).length != 0;
    }

    // Functions for adding Student Details into the blockchain.

    function addStudentDetails(
        string memory _fullName,
        string memory _email,
        string memory _gender
    ) public {
        require(
            students[msg.sender].studentAddress == address(0),
            "Student Address already added"
        );

        students[msg.sender] = Student(msg.sender, _fullName, _email, _gender);
    }

    function isStudentExists() public view returns (bool) {
        return students[msg.sender].studentAddress != address(0);
    }

    function getStudentDetails() external view returns (Student memory) {
        return students[msg.sender];
    }

    function deleteStudentDetails() public {
        require(
            students[msg.sender].studentAddress != address(0),
            "Student Details already deleted"
        );
        delete students[msg.sender];
    }

    /* 
        Adding verifier address
    */

    function isVerifierExists(address _address) public view returns (bool) {
        return verifiers[_address].verifierAddress != address(0);
    }

    function addVerifierDetails(
        string memory _name,
        string memory _email,
        string memory _instituteType,
        string memory _location,
        string memory _logoCid
    ) public {
        require(!isVerifierExists(msg.sender), "Verifier already exists");

        verifiers[msg.sender] = Verifier(
            msg.sender,
            _name,
            _email,
            _instituteType,
            _location,
            _logoCid
        );

        verifiersList.push(msg.sender);
    }

    function deleteVerifier() public {
        require(isVerifierExists(msg.sender), "Verifier does not exists");

        delete verifiers[msg.sender];
    }

    function getVerifierDetails(
        address _address
    ) external view returns (Verifier memory) {
        return verifiers[_address];
    }

    function getAllVerifiers() public view returns (Verifier[] memory) {
        Verifier[] memory allVerifiers = new Verifier[](verifiersList.length);

        uint256 count = 0;

        for (uint256 i = 0; i < verifiersList.length; i++) {
            if (isVerifierExists(verifiersList[i])) {
                allVerifiers[count] = verifiers[verifiersList[i]];
                count++;
            }
        }

        assembly {
            mstore(allVerifiers, count)
        }

        return allVerifiers;
    }

    // function generateVerifierId(string memory _name, string memory _email)
    //     external
    //     pure
    //     returns (bytes memory)
    // {
    //     return abi.encodePacked(_name, "_", _email);
    // }
}
