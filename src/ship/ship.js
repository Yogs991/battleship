function Ship(length, name){
    let hitCount = 0;
    
    const isHit = ()=>{
        hitCount += 1;
    }

    const isSunk = ()=>{
        return hitCount >= length;
    }

    return {name, length, isHit, isSunk}
}

module.exports = Ship;