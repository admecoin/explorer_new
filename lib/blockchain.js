
const params = {
  LAST_POW_BLOCK: 10000,
  RAMP_TO_BLOCK: 0,
  LAST_SEESAW_BLOCK: 0,
  FIRST_BUDGET_BLOCK: 0,
};

const avgBlockTime = 90; // 1.5 minutes (90 seconds)

const blocksPerDay = (24 * 60 * 60) / avgBlockTime; // 960

const blocksPerWeek = blocksPerDay * 7; // 6720

const blocksPerMonth = (blocksPerDay * 365.25) / 12; // 29220

const blocksPerYear = blocksPerDay * 365.25; // 350640

const mncoins = 50000.0;

const getMNBlocksPerDay = (mns) => {
  return blocksPerDay / mns;
};

const getMNBlocksPerWeek = (mns) => {
  return getMNBlocksPerDay(mns) * (365.25 / 52);
};

const getMNBlocksPerMonth = (mns) => {
  return getMNBlocksPerDay(mns) * (365.25 / 12);
};

const getMNBlocksPerYear = (mns) => {
  return getMNBlocksPerDay(mns) * 365.25;
};

const getMNSubsidy = (nHeight = 0, nMasternodeCount = 0, nMoneySupply = 0) => {
    const blockValue = getSubsidy(nHeight);
    const budgetHeight = params.FIRST_BUDGET_BLOCK;
    const height = nHeight + 1;
    let payment = 0;

  /*  if (height >= 2 && height < budgetHeight)
        payment = blockValue / 100 * 65;
    // Budget withhold 5%
    else if (height >= budgetHeight)
        payment = blockValue / 100 * 60;

    return payment;
	*/
};

const getSubsidy = (nHeight = 1) => {
    const height = nHeight + 1;
    let value = 0;

    if (height == 1)
        value = 90000000;
    else if (height >= 2 && height <= 10000)
        value = 0.0001;
    else if (height >= 1000000 && height <= 1500000) 
        value = 3;
    else if (height >= 2000000 && height <= 2500000) 
        value = 3;
    else if (height >= 2500000) 
        value = 3;
    
    // Budget withhold 5%
    //if (height >= params.FIRST_BUDGET_BLOCK)
     //   value -= value / 100 * 5;

    return value;
};

const getROI = (subsidy, mns) => {
  return ((getMNBlocksPerYear(mns) * subsidy) / mncoins) * 100.0;
};

const isAddress = (s) => {
  return typeof(s) === 'string' && s.length === 34;
};

const isBlock = (s) => {
  return !isNaN(s) || (typeof(s) === 'string');
};

const isPoS = (b) => {
  return !!b && b.height > params.LAST_POW_BLOCK; // > 960
};

const isTX = (s) => {
  return typeof(s) === 'string' && s.length === 64;
};

module.exports = {
  avgBlockTime,
  blocksPerDay,
  blocksPerMonth,
  blocksPerWeek,
  blocksPerYear,
  mncoins,
  params,
  getMNBlocksPerDay,
  getMNBlocksPerMonth,
  getMNBlocksPerWeek,
  getMNBlocksPerYear,
  getMNSubsidy,
  getSubsidy,
  getROI,
  isAddress,
  isBlock,
  isPoS,
  isTX
};
