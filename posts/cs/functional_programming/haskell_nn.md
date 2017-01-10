---
title: Neural nets in Haskell
published: 2016-12-25
modified: 2016-12-25
tags: haskell, functional programming
type: programming
showTOC: True
---

```
data Tensor dim a where
  ZTensor :: a -> Tensor '[] a
  STensor :: Vec n (Tensor dim a) -> Tensor (n ': dim) a
```

* [Accelerate](https://hackage.haskell.org/package/accelerate-0.15.1.0/docs/Data-Array-Accelerate.html)
* [DAGs and PHOAS](https://www.reddit.com/r/haskell/comments/4rynuq/directed_acyclic_graphs_and_phoas/)
* https://github.com/tensorflow/haskell
* https://github.com/albertoruiz/hmatrix
* http://hackage.haskell.org/package/HaskellNN
* https://themonadreader.files.wordpress.com/2013/03/issue214.pdf
* http://okmij.org/ftp/Haskell/
* https://www.schoolofhaskell.com/user/edwardk/phoas
* https://github.com/vladfi1/hs-nn
* https://github.com/holdenlee/hasflow
* https://hackage.haskell.org/package/singletons

# Automatic differentiation

* https://hackage.haskell.org/package/ad
* [wiki](https://wiki.haskell.org/Automatic_Differentiation)
* http://comonad.com/reader/2010/reverse-mode-automatic-differentiation-in-haskell/
* http://www.danielbrice.net/blog/10/
* http://www.danielbrice.net/blog/15/
* http://conal.net/blog/posts/beautiful-differentiation
* http://stackoverflow.com/questions/14676075/haskell-ad-package
* http://stackoverflow.com/questions/30888615/how-to-get-more-performance-out-of-automatic-differentiation
* [reddit](https://www.reddit.com/r/haskell/comments/35ud22/neural_networks_and_fast_automatic_differentiation/)

# Tensorflow

* [Tensorflow bindings](https://github.com/tensorflow/haskell)
* [Documentation index](file:///C:/Users/oldhe/Dropbox/CS/hs/tensorflow-haskell/docs/haddock/doc-index-G.html)
* [MNIST example](https://github.com/tensorflow/haskell/blob/master/tensorflow-mnist/app/Main.hs)
* [Input for MNIST](https://github.com/tensorflow/haskell/blob/master/tensorflow-mnist-input-data/src/TensorFlow/Examples/MNIST/InputData.hs) (WHERE IS `Paths_tensorflow_mnist_input_data`?)
* [Ops doc](file:///C:/Users/oldhe/Dropbox/CS/hs/tensorflow-haskell/docs/haddock/tensorflow-core-ops-0.1.0.0/TensorFlow-GenOps-Core.html#v:softmax)
* [CoreOps Setup.hs](https://github.com/tensorflow/haskell/blob/master/tensorflow-core-ops/Setup.hs)
