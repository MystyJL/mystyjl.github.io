# NodeSolver
web app for maplestory
We all have that scenario where we open up 200 nodes, look through our boost nodes and we see about 20-30 usable trios but we need to work through
all the combinations to see what is optimal. This web app is just for that situation. Just type in all your trios, type in what you're going for 
and press calculate. You will get an answer in miliseconds.

## High level OverView
Given a set of object requirements r in the form [a,b,...], and a set of grouped trios of said objects t in the form [[a,b,c],[e,f,g],...], we want to
find a subset of t that contains 2 r. That is, we want to have 2 of every element in r inside our subset of t and we want to achieve this in the lowest 
possible number of elements in t.
