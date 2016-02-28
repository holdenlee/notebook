#Build instructions

If you changed it, compile site.hs.

    ghc --make -threaded site.hs

After updating pages, 

    ./site rebuild

Start the server by

	./site watch

#Organization

Write in these fields:

* type: paper (notes on a paper), research (cf. Gowers's blog), notes (notes on books or things I learn), concept (?)
** Have Paper, Research, Notes on the top.
* bib: for a citation.
