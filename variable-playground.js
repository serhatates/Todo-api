// -------object-------
let person = {
    name: 'Serhat',
    age: 21
};

let a = 5;

function updatePerson(person) {
    let a = 4;
    console.log(a);
    person.age = 31; // not lose reference, update orginal object
    // person = { // we lose the reference here!
    //     name: 'Serhat',
    //     age: 29
    // };
    console.log('inside: %o', person);
}

updatePerson(person);
console.log('outside: %o', person);
console.log(a);

// -------array-------
var grades = [15, 88];

function addGrades(gradesArr) {
    gradesArr.push(35); // not lose reference, update orginal array
    debugger;
    // gradesArr = [12, 45, 99]; // we lose the reference here!
}

addGrades(grades);
console.log(grades);

// about debugger => tells node where to stop with the program
// *** node debug filename,, node inspect filename
// *** cont, continuous the program
// *** repl, we can inspect variables and functions inside of our code,,
// then type variable name for inspect




