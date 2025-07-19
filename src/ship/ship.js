function Ship(length){
    let hitCount = 0;
    
    const isHit = ()=>{
        hitCount += 1;
    }

    const isSunk = ()=>{
        return hitCount >= length;
    }

    return {length, isHit, isSunk}
}

module.exports = Ship;