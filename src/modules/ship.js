// function Ship(length){
//     let hitCount = length;

//     const isHit = ()=>{
//         if(hitCount>0){
//             hitCount--;
//         }
//     };

//     const isSunk = ()=> hitCount == 0;
//     return{length, isHit, isSunk}
// }

function Ship(name,length){
    this.name = name;
    this.length = length;
    let hitCount = 0;

    const isHit = ()=>{
        hitCount += 1;
    }

    const isSunk = ()=>{
        if(hitCount >= length){
            return true;
        }
        return false;
    }

    return{name, length, hitCount, isHit, isSunk}
}

module.exports = Ship;