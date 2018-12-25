import numeral from 'numeral';
import "!!tee-loader?label=inline-after!tee-loader?label=inline-before!./newfile.js"

const courseValue = numeral(1000).format('$0,0.00');
console.log(`I would pay ${courseValue} for this awesome course!`)

if(ENV_IS_DEVELOPMENT){
    console.log('this is devlopment environment')
}