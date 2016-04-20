---
title: Haskell
published: 2016-04-03
modified: 2016-04-03
tags: none
type: notes
showTOC: True
---

#Parsec

```haskell
type LeafTree = Free []

leaf = Pure
node = Free

genWord = many1 (noneOf " (),\n")

parseExpr :: Parser a -> Parser (LeafTree a)
parseExpr p = (spaces >> (p >>= (return . leaf))) <|>
  do {
    char '(';
    trees <- sepEndBy (parseExpr p) spaces;
    char ')';
    return $ node trees;
  }

parseLISP' :: Parser (LeafTree String)
parseLISP' = parseExpr genWord

parseLISP :: String -> Maybe (LeafTree String)
parseLISP = fromRight . parse parseLISP' ""
```

#Many ways to write a for loop

1.  `foldl`, shuffle the arguments around to your preference. `foldl::foldl :: Foldable t => (a -> b -> a) -> a -> t b -> a`.
	```haskell
	for' :: [a] -> b -> (a -> b -> b) -> b
	for' li x0 f = foldl (flip f) x0 li

	--simple for loop
	for' [1,2,3] 0 (\y i -> i + y)

	--nested for loop
	for' [1..5] 0 (\x i ->
		for' [1..x] i (\y j -> j+y))
	-- same as (in other languages): s=0; for x in [1..5] {for y in [1..x]{s = s+y}}; return y
	```
2.  Use Haskell's built-in for! `forM` on State:
	```haskell
	execState (forM_ [1..5] (\x ->
		forM_ [1..x] (\y ->
			modify (+y)
		)
	)) 0
	```

* [ST](https://hackage.haskell.org/package/base-4.8.2.0/docs/Control-Monad-ST.html)
* [IO vs. ST](http://stackoverflow.com/questions/20439316/when-to-use-stref-or-ioref)
* [STRef](https://hackage.haskell.org/package/base-4.8.2.0/docs/Data-STRef.html)
* [LoopWhile](http://hackage.haskell.org/package/loop-while-1.0.0/docs/Control-Monad-LoopWhile.html)

See `C:\Users\Owner\Dropbox\CS\hs\learning`.

#Useful things

* [Memoization](http://hackage.haskell.org/package/monad-memo) (dynamic programming) 

<!--
When you want every feature, vs. just include features you want.
-->
