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
