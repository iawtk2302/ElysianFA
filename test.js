const a = {a: 3, c: 4}
const b = {a: 4, c: 4}
let angular;
const ff = () => {
    if(angular.equals(a, b)) {
        console.log('first')
    }
}
ff()