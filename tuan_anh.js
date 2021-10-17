let k1,k2,k3,k4,k5,k6;
import Web3 from 'web3'
import Contract from 'web3-eth-contract';
import {getInterface} from './interface.js';

function calculate_x(k1,k2,k3,k4,k5,k6){
  if(k2*k4*k6 <= Math.pow(1.003,3)*k1*k3*k5){
    console.log("We advise you not to invest at this time")
  }
  else{
    let safeValueOfX = (k2*k4*k6-Math.pow(1.003,3)*k1*k3*k5)/(Math.pow(1.003,2)*k3*k5+1.003*k2*k5+k2*k4);
    let x_ = (1.003*Math.sqrt(1.003*k1*k2*k3*k4*k5*k6) - Math.pow(1.003,3)*k1*k3*k5)/(Math.pow(1.003,2)*k3*k5+1.003*k2*k5+k2*k4);//so WETH bo ra
    let x = x_/1.003;
    let benefit = (k2*k4*k6*x)/(Math.pow(1.003,2)*k1*k3*k5+(Math.pow(1.003,2)*k3*k5+1.003*k2*k5+k2*k4)*x) - 1.003*x;
    console.log(`the value of x so that y > x is: 0 < x < ${safeValueOfX}`)
    console.log(`the value of x for maximum profit is: ${x_} WETH`)
    console.log(`maximum-benefit is: ${benefit}`)
  }
}

const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/33fa04b1caa64b03b119d504eaf35b53");
Contract.setProvider(provider);
var contractPair1 = new Contract(getInterface(), "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852");
var contractPair2 = new Contract(getInterface(), "0x0DE0Fa91b6DbaB8c8503aAA2D1DFa91a192cB149");//1:USDT 0:WBTC
var contractPair3 = new Contract(getInterface(), "0xBb2b8038a1640196FbE3e38816F3e67Cba72D940");
const getData = async()=>{
  const pair1 = await contractPair1.methods.getReserves().call();
  const pair2 = await contractPair2.methods.getReserves().call();
  const pair3 = await contractPair3.methods.getReserves().call();
  const token0 = await contractPair2.methods.token0().call();
  const token1 = await contractPair2.methods.token1().call();
  k1 = pair1[0]/1000000000000000000//WETH
  k2 = pair1[1]/1000000//USDT
  k3 = pair2[1]/1000000//USDT
  k4 = pair2[0]/100000000//WBTC
  k5 = pair3[0]/100000000//WBTC
  k6 = pair3[1]/1000000000000000000//WETH
  console.log(`pair1: WETH: ${k1} - USDT ${k2}`)
  console.log(`pair2: USDT: ${k3} - WBTC ${k4}`)
  console.log(`pair3: WBTC: ${k5} - WETH ${k6}`)
  // k1 = 50000;
  // k2 = 100000000;
  // k3 = 85000;
  // k4 = 2.18124;
  // k5 = 1885.824;
  // k6 = 40883;
  calculate_x(k1,k2,k3,k4,k5,k6)
}
getData()