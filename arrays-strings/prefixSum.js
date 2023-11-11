/*
Prefix Sum
Create array prefix where prefix[i] is the sum of all elements up to index i (inclusive)
When a subarray starts at index 0, it is considered a prefix of the array. Prefix sum represents sum of all prefixes
Allows us to find sum of any subaray in O(1)
If we want sum of subarray from i to j inclusive => prefix[j] - prefix[i-1] or prefix[j] - prefix[i] + nums[i] (if i = 0 and out of bounds)
prefix[i - 1] is the sum of all elements before i

Pseudocode
prefix = [nums[0]]
for (i to n-1) prefix.push(nums[i] + prefix[-1])

It costs O(n) to build but allows all future subarray queries to be O(1)
Building the prefix sum is a form of pre-processing
(good strategy where we store pre-computed data in a data structure before running main logic of our algorithm)
*/
// Ex.1
// Given nums, and queries where queries[i] = [x, y], and integer limit
// return boolean array that represents the answer to each query
// query is true if sum of subarray from x to y is less than limit, false otherwise.
// i.e nums = [1,6,3,2,7,2], queries = [[0,3], [2,5], [2,4]], limit = 13; ans = [true,false,true]
function answerQueries(nums, queries, limit) {
    let prefix = [nums[0]]
    for (let i = 1; i < nums.length - 1; i++) {
        prefix.push(nums[i] + prefix[prefix.length - 1]);
    }
    let ans = [];
    for (let [x,y] of queries) {
        ans.push(prefix[y] - prefix[x] + nums[x] < limit)
    }
    return ans;
}
// console.log(answerQueries([1,6,3,2,7,2], [[0,3], [2,5], [2,4]], 13))

// Ex.2 Number of Ways to Split Array
// find number of ways to split array into 2 parts s.t. 1st sum >= 2nd sum; 2nd should have at least 1 number
// function waysToSplit(nums) {
//     let prefix = [nums[0]];
//     for (let i = 1; i < nums.length; i++) prefix.push(nums[i] + prefix[prefix.length - 1]);
//     let ans = 0;
//     for (let i = 0; i < nums.length - 1; i++) {
//         let left = prefix[i];
//         let right = prefix[prefix.length - 1] - prefix[i];
//         if (left >= right) ans++;
//     }
//     return ans;
// }
// Optimize
function waysToSplit(nums) {
    // We don't actually need the whole prefix sum array
    let total = nums.reduce((sum, n) => sum + n, 0), left = 0;
    let ans = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        left += nums[i];
        let right = total - left;
        if (left >= right) ans++;
    }
    return ans;
}
// Ex.3 Minimum Value to Get Positive Step by Step Sum
// start with initial positive value startValue; calculate step by step sum of startValue + elements in nums
// return minimum positive value of startValue s.t. step by step sum is never < 1
function minStartValue(nums) {
    let prefix = [nums[0]];
    for (let i = 1; i < nums.length; i++) prefix.push(nums[i] + prefix[prefix.length - 1]);
    let min = prefix.reduce((min, n) => min < n ? min : n)
    return min < 0 ? Math.abs(min) + 1 : 1;
}

// // Optimize
// function minStartValue(nums) {
//     let sum = 0, ans = 0;
//     for (let num of nums) {
//         sum += num;
//         ans = Math.min(ans, sum);
//     }
//     return -ans + 1;
// }
// console.log(minStartValue([2,3,5,-5,-1]))

// Ex.4 K Radius Subarray Averages
// k-radius average for a subarray centered at i with radius k
// is average of (nums[i-k] to nums[i+k] inclusive)
// if there are less than k elements before or after index i => return -1
/*
[7,4,3,9,1,8,5,2,6]
[7,11,14,23,24,32,37,39,45]
*/
function kRadiusAverage(nums, k) {
    let prefix = [nums[0]];
    for (let i = 1; i < nums.length; i++) prefix.push(nums[i] + prefix[prefix.length - 1]);
    let result = new Array(nums.length).fill(-1);
    for (let j = k; j < nums.length - k; j++) {
        result[j] = Math.floor((prefix[j+k] - prefix[j-k] + nums[j-k]) / (2*k+1))
    }
    return result;
}
console.log(kRadiusAverage([7,4,3,9,1,8,5,2,6], 3))
