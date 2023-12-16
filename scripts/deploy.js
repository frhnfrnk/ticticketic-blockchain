async function main() {
  const Ticticket = await ethers.getContractFactory("Ticticket");

  // Start deployment, returning a promise that resolves to a contract object
  const Ticticket_ = await Ticticket.deploy("Ticticket", "TICTIC");
  console.log("Contract address:", Ticticket_.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
