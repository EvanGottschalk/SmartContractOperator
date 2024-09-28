// Gas Price and Gas Limit Estimations

async function levelUp() {
    const contract = new ethers.Contract(contractAddress, jsonAbi, signer);
    var imageURI = image_uris[user_element][Math.min(user_stats['Level'] + 1)];
    //address, image_uris[user_element][Math.min(user_stats['Level'] + 1)]
  
    //const contractInstance = await contract.deploy(..., { gasPrice: ..., gasLimit: ... });
    //const estimatedGas = contractInstance.deployTransaction.gasLimit;
  
    //const abiCoder = new ethers.utils.AbiCoder();
  
    const gasLimit = 1000000; // set gas limit in Gwei
    const gasPrice = await provider.getGasPrice(); //ethers.BigNumber.from("1000000000"); // set gas price in wei
    console.log("Gas Price: ", gasPrice.toNumber());
  
    //const encodedData = await contract.methods.levelUp(address).encodeABI();
    //console.log("Encoded Data: ", encodedData);
  
    const estimatedGas = await provider.estimateGas(contract.levelUp(address).data);
    //const estimatedGas = await provider.estimateGas({ to: contractAddress, data: encodedData });
    console.log("Estimated Gas: ", estimatedGas);
  
    /*const estimatedGas = await provider.estimateGas({
      to: contract.address,
      data: contract.interface.functions.levelUp.encode([address]),
      gasPrice: gasPrice
    });
    const finalGasLimit = gasLimit > estimatedGas ? gasLimit : estimatedGas;*/
    
    //const finalGasLimit = 10000000;
    console.log('New Image URI: ', image_uris[user_element][Math.min(user_stats['Level'] + 1)]);
    const transactionInfo = await contract.levelUp(address,
                                                  {gasPrice: gasPrice,
                                                   gasLimit: estimatedGas});