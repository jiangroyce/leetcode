// Sliding Windows
/*
Subarray problems:
1. Have a constraint metric that makes subarray valid
2. and a numeric restriction on the constraint metric
3. ask you to find the best subarray (ie. longest)
4. or the number of valid subarrays

i.e. find longest subarray where sum (constraint metric) <= k (numeric restriction)
i.e. find longest substring that has at most one "0"
i.e. find # of subarrays that have product < k

Algorithm: idea is to consider only valid subarrays
1. maintain 2 pointer variables left and right to represent current subarray
2. initally left = right = 0; --> expand window by right++
3. if adding new element makes subarray invalid --> remove elements by left++

Analysis:
For any array, there are n subarrays of length 1, n-1 subarrays of length 2, ...
so there are n(n+1)/2 total subarrays so brute force will have O(n^2)
Sliding window guarantees a max of 2n window iterations (right = n, left = n)
So if logic for each window is O(1) => total will be O(n)

Number of Subarrays
How many valid windows end at right? total of (right - left + 1)
(left, right), (left+1, right), (left+2, right), ... (right, right)

Fixed window size
Difference between 2 adjacent windows is only 2 elements
*/
// Ex. 1:
// find length of longest subarray in nums that has sum <= k
let nums = [3, 2, 1, 3, 1, 1];
let k = 5;
// 0. Identify constraint metric (sum <= k)
function findLength(nums, k) {
    let result = 0;
    // 1. initialize left and right and keep track of current subarray sum
    let left = 0, right = 0;
    // first subarray is [3];
    let curr = 0
    // 2. expand until constraint is broken => [3, 2, 1] ([3, 2] is 1 valid option)
    // we can use for loop to iterate right because its always moving forward
    for (right; right < nums.length; right++) {
        curr += nums[right]
        // 3. shrink window until valid again => [2, 1]
        // we remove 3 because nums only positive, there won't be any more subarrays with 3 that will be valid
        // we can use while loop because we may need to remove multiple elements to make valid again
        // if (curr <= k) result.push(nums.slice(left, right + 1))
        while (curr > k) {
            curr -= nums[left++]
            // if (curr <= k) result.push(nums.slice(left, right + 1))
        }
        // Update result at end of both loops
        result = Math.max(result, right - left + 1)
    }
    return result
}

// Ex. 2
// Given binary string s, you may choose up to one "0" and flip it a a "1".
// What is the length of longest substring that contains only "1"s?
// 0. Understand the Problem
// Problem can be thought of as what is the longest substring that contains at most one "0";
function longestOnes(s) {
    // 1. initialize left, curr (to keep track of how many "0"s)
    let left = 0, curr = 0, result = 0;
    for (let right = 0; right < s.length; right++) {
        if (s[right] == 0) curr++;
        while (curr > 1) {
            curr -= s[left++] == 0 ? 1: 0;
        }
        result = Math.max(result, right - left + 1);
    }
    return result;
}
// console.log(longestOnes("1101100111"))

// Ex. 3 Subarray Product < k;
// find number of subarrays with product < k
// nums = [10, 5, 2, 6], k = 100; ans = 8 ([10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6])
function subArrayProducts(nums, k) {
    if (k <= 1) return 0;
    let left = 0, ans = 0, curr = 1
    for (let right = 0; right < nums.length; right++) {
        curr *= nums[right]
        while (curr >= k) {
            curr /= nums[left++]
        }
        ans += right - left + 1;
    }
    return ans;
}
// console.log(subArrayProducts([10,5,2,6], 100))

// Ex. 4 Fixed Window
// Given nums and k, find the subarray of length k with the largest sum;
function largestSum(nums, k) {
    let curr = 0;
    for (let i = 0; i < k; i++) {
        curr += nums[i]
    }
    let ans = curr;
    for (let i = k; i < nums.length; i++) {
        curr += nums[i] - nums[i - k];
        ans = Math.max(ans, curr);
    }
    return ans;
}
// console.log(largestSum([3, -1, 4, 12, -8, 5, 6], 4))

// Ex. 5 Maximum Average Subarray 1
// Given nums, k find subarray whose length = k that has max avg value and return this value;
function maxAvg(nums, k) {
    let curr = 0;
    for (let i = 0; i < k; i++) {
        curr += nums[i] / k;
    }
    let ans = curr;
    for (let i = k; i < nums.length; i++) {
        curr += (nums[i] - nums[i - k])/k
        ans = Math.max(ans, curr)
    }
    return ans;
}

// Ex.6 Max Consecutive Ones 3
// Given binary array nums and k
// find maximum number of consecutive 1s where you can flip at most k 0s
// 0. Understand the Problem
// Find maximum substring where there are at most k 0s
function longestOnes(nums, k) {
    let left = 0, curr = 0, ans = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] == 0) curr++;
        while (curr >= k) {
            curr -= nums[left++] == 0 ? 1 : 0;
        }
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
}
