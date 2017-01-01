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

[Accelerate](https://hackage.haskell.org/package/accelerate-0.15.1.0/docs/Data-Array-Accelerate.html)

[DAGs and PHOAS](https://www.reddit.com/r/haskell/comments/4rynuq/directed_acyclic_graphs_and_phoas/)

# Tensorflow

* [Tensorflow bindings](https://github.com/tensorflow/haskell)
* [Documentation index](file:///C:/Users/oldhe/Dropbox/CS/hs/tensorflow-haskell/docs/haddock/doc-index-G.html)
* [MNIST example](https://github.com/tensorflow/haskell/blob/master/tensorflow-mnist/app/Main.hs)
* [Input for MNIST](https://github.com/tensorflow/haskell/blob/master/tensorflow-mnist-input-data/src/TensorFlow/Examples/MNIST/InputData.hs) (WHERE IS `Paths_tensorflow_mnist_input_data`?)
* [Ops doc](file:///C:/Users/oldhe/Dropbox/CS/hs/tensorflow-haskell/docs/haddock/tensorflow-core-ops-0.1.0.0/TensorFlow-GenOps-Core.html#v:softmax)
* [CoreOps Setup.hs](https://github.com/tensorflow/haskell/blob/master/tensorflow-core-ops/Setup.hs)
