{-# OPTIONS
 
 -XMultiParamTypeClasses
 -XFunctionalDependencies
 -XFlexibleInstances
 -XLambdaCase
 -XRank2Types
 -XGADTs
 -XPolyKinds
 -XViewPatterns
#-}

module Main where
import System.Environment   
import System.Directory  
import System.IO  

import Control.Monad

import Data.List
import Data.Maybe
import Data.Monoid
import Data.String.Utils
import Data.Text (unpack)

import Text.ParserCombinators.Parsec
import qualified Text.Parsec.Token as P
import Text.Parsec.Language (emptyDef)
import Text.Parsec.Error

import Text.LaTeX.Base
import Text.LaTeX.Base.Render
import Text.LaTeX.Base.Parser
import Text.LaTeX.Base.Syntax

import Text.Printf

import Utilities
import ParseUtilities

lexer :: P.TokenParser ()
lexer  = P.makeTokenParser (emptyDef)

whiteSpace= P.whiteSpace lexer
lexeme    = P.lexeme lexer
symbol    = P.symbol lexer
natural   = P.natural lexer
parens    = P.parens lexer
semi      = P.semi lexer
identifier= P.identifier lexer
reserved  = P.reserved lexer
reservedOp= P.reservedOp lexer

convertMacros :: String -> String
convertMacros str = printf 
                    "MathJax.Hub.Config({\n  TeX: {\n    extensions: [\"AMSmath.js\",\"color.js\"],\n    Macros: {\n%s\n    }\n  }\n});%s" (intercalate ",\n" $ map lineOut $ makeCommandList (parseLaTeX2 str)) postText

parseLaTeX2 :: String -> LaTeX
parseLaTeX2 str = 
    case parseLaTeX $ fromString str of
      Left _ -> TeXEmpty
      Right t -> t

postText = "\n\nMathJax.Ajax.loadComplete(\"[MathJax]/config/local/local.js\");"

main = do
  let inputF = "C:/Users/Owner/Dropbox/Math/templates/macros.tex"
  ioFile inputF "local.js" convertMacros

--takes care of bug where quotes appear
stripQuotes :: String -> String
stripQuotes str = reverse $ tail $ reverse $ tail str

showLatex :: LaTeX -> String
showLatex = unpack . render
-- stripQuotes . show . render

getCommandInfo :: [TeXArg] -> (String, Int, String)
getCommandInfo = \case
      [FixArg a, FixArg b] -> (removeSlash $ showLatex a, 0, showLatex b)
      [FixArg a, OptArg (TeXRaw n), FixArg b] -> (removeSlash (showLatex a), read $ unpack n, showLatex b)

removeSlash :: String -> String
removeSlash s = (if head s == '\\' then tail else id) s

dupSlash :: String -> String
dupSlash = replace "\\" "\\\\"

makeCommandList :: LaTeX -> [(String, Int, String)]
makeCommandList = \case
      TeXComm str args -> 
          if str `elem` ["newcommand", "renewcommand"]
          then [getCommandInfo args]
          else []
      TeXSeq latex1 latex2 -> makeCommandList latex1 ++ makeCommandList latex2
      _ -> []

lineOut :: (String, Int, String) -> String
lineOut (macro, n, (dupSlash -> out)) = 
    case n of
      0 -> printf "      %s: \"%s\"" macro out
      _ -> printf "      %s: [\"%s\",%d]" macro out n
--        macro' = (if head macro == '\\' then tail else id) macro
