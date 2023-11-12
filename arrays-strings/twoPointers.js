/*
Start at Edges
1. initialize left and right
2. while pointers don't intersect
    do the thing
    either left++, right--, or both

Iterating through 2 arrays
1. initialize both pointers i = 0, j = 0
2. while loop until 1 reaches end of its array
    do the thing
    either i++, j++ or both
3. use another loop to finish off leftovers in the longer array
    can write 2 loops because only 1 will execute
 */

function isPalindrome(str) {
    let p1 = 0;
    let p2 = str.length - 1;
    while (p1 < p2) {
        if (str[p1] !== str[p2]) return false;
        p1++;
        p2--;
    }
    return true;
}

function twoSumSorted(arr, target) {
    let p1 = 0;
    let p2 = arr.length - 1;
    while (p1 < p2) {
        if (arr[p1] + arr[p2] === target) return [arr[p1], arr[p2]];
        else if (arr[p1] + arr[p2] < target) p1++;
        else p2--;
    }
    return false;
}

function merge(arr1, arr2) {
    let p1 = 0;
    let p2 = 0;
    let ans = [];
    while (p1 < arr1.length && p2 < arr2.length) {
        if (arr1[p1] < arr2[p2]) ans.push(arr1[p1++])
        else ans.push(arr2[p2++])
    }
    while (p1 < arr1.length) {
        ans.push(arr1[p1++])
    }
    while (p2 < arr2.length) {
        ans.push(arr2[p2++])
    }
    return ans;
}

// console.log(merge([1,4,7,20], [3,5,6]))

function isSubsequence(s, t) {
    let i = 0, j = 0;
    for (j; j< t.length; j++) {
        if (s[i] == t[j]) i++;
    }
    return (i === s.length);
}

// console.log(isSubsequence("ace", "abcde"))
