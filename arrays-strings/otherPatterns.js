// Building Strings in O(n)
// Since strings are immutable, adding characters to string is O(n)
// Building a string with simple concatenation will be O(n^2)
// Use [].push(...).join("") for O(n) in Python
// Using += is fine in Javascript

/*
Subarrays, Subsequences, Subsets
Subarrays:
if problem has explicit constraints such as max of k unique elements or no dups allowed
And/or asks for min/max length, # of subarrays, min/max sum ==> use sliding window

if problem's input is an integer array and you will need to calculate multiple subarray sums => build prefix sum

size of subarray between i and j inclusive is j - i + 1.
this is also the # of subarrays that end at j starting from i or later

Subsequences:
a subsequence is a set of elements of an array that keeps the same relative order but doesn't need to be contiguous
subsequences of [1, 2, 3, 4] include [1, 3], [], [2, 3], [4] but now [3, 2], [5], [4, 1]
twoPointers can be used, but not sliding window or prefix sum

Subsets:
a subset is any set of elements. Order doesn't matter.
Subsets that contain the same elements are considered the same. [1,4,2] == [4,1,2]
Subsets are easier than subsequences since you can sort the input
*/
