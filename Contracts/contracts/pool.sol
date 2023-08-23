// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract poolANDwithdraw {

    address public OWNER;
    
    struct Pool {
        address  creator;
       // uint256 maxSendAmount;
       // uint256 minSendAmount;
        uint256 maxLiquidity;
        uint256 currentLiquidity;
        uint256 startTime;
        uint256 finishTime;

    }
    Pool[] public pools;
    uint256 public poolCount = 0;
    uint256 public contributorIndex = 0;

    mapping (uint256 => address[]) contributors;

    constructor() {
        OWNER = msg.sender;
        pools.push(Pool(0x6e6514fd1a91067e763DC97b63a4ACfBB35349A8, 1000, 500, block.timestamp, block.timestamp + 86400));
        poolCount++;
        pools.push(Pool(0x19124D731e95CdE28539c72D1c0DC3C6Ca025722, 2000, 1500, block.timestamp + 86400, block.timestamp + 2 * 86400));
        poolCount++;
    }

    mapping(address => bool) public poolCreators;
    
    function createPool(
        //uint256 _maxSendAmount,
        //uint256 _minSendAmount,
        //uint256 _maxLiquidity,
        //uint256 _duration
    ) external {
        //require(poolCreators[msg.sender], "You don't have permission to create pools");

         pools.push(Pool({
            creator: msg.sender,
            //maxSendAmount: _maxSendAmount,
            //minSendAmount: _minSendAmount,
            maxLiquidity: 1000,
            currentLiquidity: 0,
            startTime: block.timestamp,
            finishTime: block.timestamp + 10*60*60
            //contributorList: adr
        }));
        poolCount++;
    }

    function contribute(uint256 _poolId) external payable {
        //require(_poolId <= poolCount, "Invalid pool ID");

        pools[_poolId].currentLiquidity += msg.value;
        require(block.timestamp < pools[_poolId].finishTime, "Pool contribution time has ended");
        //pool.contributorList.push(msg.sender);
    }
    
    function withdrawContribution(uint256 _poolId) external {
        require(_poolId <= poolCount, "Invalid pool ID");

        uint256 contribution =  pools[_poolId].currentLiquidity;
        //require(contribution == 0, "No contribution to withdraw");
        pools[_poolId].currentLiquidity = 0;

        //require(block.timestamp >= pool.finishTime, "Cannot withdraw until pool finish time");

        payable(pools[_poolId].creator).transfer(contribution);
    }

    function getPools(uint _ind) public view returns (Pool memory){
        return pools[_ind];
    }

    function getPoolCount() public view returns (uint){
        return poolCount;
    }

    function getPoolStatus(Pool memory _pol) public view returns (bool) {
        return (block.timestamp >= _pol.startTime && block.timestamp < _pol.finishTime);
    }

    function grantPermission(address _creator) external onlyOwner {
        poolCreators[_creator] = true;
    }

    function revokePermission(address _creator) external onlyOwner {
        poolCreators[_creator] = false;
    }

    modifier onlyOwner() {
        require(msg.sender == OWNER, "Only the owner can call this function");
        _;
    }

}
