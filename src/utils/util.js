
export function roundToDecimal(value,decimals){ 
    
    const factor = Math.pow(10,decimals)
    return Math.round(value * factor) / factor;
}