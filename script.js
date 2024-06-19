var tildeCounter = document.getElementById("tildeCounter");
const segmentTypes = ["ISA", "GS", "ST", //Header Records
"BGN", "QTY", "N1", //Less Importent Headers
"SE", "GE", "IEA", //Trailer Records
"INS", "REF", "HD", "DTP", "NM1", "N3", "N4", "DMG", "COB", "FSA"]; //Other
const HD05 = [ "CHD", "DEP", "E1D", "E2D", "E3D", "E5D", "E6D", "E7D", "E8D", "E9D", "ECH", "EMP", "ESP", "FAM", "IND", "SPC", "SPO", "TWO" ];
const DTP01 = [ "007", "050", "286", "296", "297", "300", "301", "303", "336", "337", "338", "339", "340", "341", "343", "348", "349", "350", "351", "356", "357", "383", "385", "386", "393", "394", "473", "474", "543", "695" ];
const DMG03 = ["M", "F", "U"];
const DMG04 = ["B", "D", "I", "M", "R", "S", "U", "W", "X"];
const COB01 = ["P", "S", "T", "U"];
const COB03 = ["1", "5", "6"];
var STSEPairCount = 0;
var GS06;
var ISA13;
var functionalGroupCount;
//Segment Objects
//#region 
var ISA = {
    count: 16,
    segmentLengths: [2, 10, 2, 10, 2, 15, 2, 15, 6, 4, 1, 5, 9, 1, 1, 1],
    length: 106
}

var GS = {
    count: 8,
    segmentLengths: [2, -1, 4, 8, 4, [1, 9], 1, 10],
    GS06: GS06
}

var ST = {
    count: 3,
    segmentLengths: [3, [4, 9], 10]
}

var BGN = {
    count: 8,
    segmentLengths: [-1, -1, 6, 4, 3, 0, 0, [1, 2]]
}

var QTY = {
    count: 2,
    segmentLengths: [2, 1]
}

var N1 = {
    count: 4,
    segmentLengths: [2, -1, -1]
}

var SE = {
    count: 2,
    segmentLengths: [-1, STSEPairCount]
}

var GE = {
    count: 2,
    segmentLengths: [[1, 6], GS06] 
}

var IEA = {
    count: 2,
    segmentLengths: [functionalGroupCount, ISA13]
}

var INS = {
    count: 17,
    segmentLengths: [1, [1,2], 3, [1,2], 1, 1, [1,2], [1,2], 1, 1, 2, 8, 1, -1, -1, -1, [1,9]]
}

var REF = {
    count: 2,
    segmentLengths: [2, -1]
}

var HD = {
    count: 5,
    segmentLengths: [3, 0, ['DEN', 'VIS'], 0, HD05]
}

var DTP = {
    count: 3,
    segmentLengths: [DTP01, 2, 8]
}

var NM1 = {
    count: 9,
    segmentLengths: [-1, 1, -1, -1, 1, -1, 2, 9]
}

var N3 = {
    count: 2,
    segmentLengths: [-1, -1]
}

var N4 = {
    count: 4,
    segmentLengths: [-1, -1, 5, -1]
}

var DMG = {
    count: 4,
    segmentLengths: [2, 8, DMG03, DMG04]
}

var COB = {
    count: 3,
    segmentLengths: [COB01, -1, COB03]
}

var FSA = {
    count: 5,
    segmentLengths: [-1, -1, -1, -1, -1]
}
//#endregion


//Logic for run button click
function run(){
    //gets value of input textbox
    input = document.getElementById("input").value;
    //split claim into segments
    var splitClaim = input.split("~");
    splitClaim.pop();
    for(i = 0; i < splitClaim.length; i++) {
        claimValidation(splitClaim[i]);
    }
}

//Split segment into indexes
function claimValidation(segment) {
    var indexLength = 0;
    var segmentArr = segment.split("*");
    var segmentType = segmentArr[0];
    var segment = getSegmentType(segmentType.trim());
    var numIndexes = segmentArr.length - 1;
    if(segmentType.count != numIndexes) {
        console.log("Error - Expected indexes: " + segment.count + " Recieved Indexes: " + numIndexes); 
    }
    for(var i = 1; i < segmentArr.length; i++) {
        segmentArr[i] = segmentArr[i].trim();
        //Length of index segment is a range or ENUM
        console.log("Index" + i + ": " + segmentArr[i]);
        if(Array.isArray(segmentArr[i])) {
            handleIndexRnage(segmentArr[i], type.segmentLengths[i - 1]);
        }
        // Flexible length indexes have -1 as length
        if (segmentArr[indexLength] > 0) {

        } 
    }
}

//Gets Segment type object from claim text
function getSegmentType(segmentType) {
    switch(segmentType) {
        case "ISA":
            return ISA;
        case "GS":
            return GS;
        case "ST":
            return ST;
        case "BGN":
            return BGN;
        case "QTY":
            return QTY;
        case "N1":
            return N1;
        case "SE":
            return SE;
        case "GE":
            return GE;
        case "IEA":
            return IEA;
        case "INS":
            return INS;
        case "REF":
            return REF;
        case "HD":
            return HD;
        case "DTP":
            return DTP;
        case "NM1":
            return NM1;
        case "N3":
            return N3;
        case "N4":
            return N4;
        case "DMG":
            return DMG;
        case "COB":
            return COB;
        case "FSA":
            return FSA;
        default:
            console.log("ERROR: Unknown segment type - " + segmentType);
    }
}

function handleIndexRnage(index, indexLength) {
}