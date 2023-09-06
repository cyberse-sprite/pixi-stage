# PixiStage

简单的线上同人展系统。

## 使用资源

使用到的字体[Cubic-11](https://github.com/ACh-K/Cubic-11)

## 预览效果

[pixi-stage](https://cyberse-sprite.github.io/pixi-stage)

## 部署

在最初的构想上，这个系统只是为了一个一次性的、小型的活动设计。地图绘制和元件摆放只需要准备素材和小量修改数据文件，默认的数据和资源是从public里面获取的，可以直接编译静态资源并部署。参考[修改地图](https://github.com/cyberse-sprite/pixi-stage/wiki/%E4%BF%AE%E6%94%B9%E5%9C%B0%E5%9B%BE)。

同时带有一个简单的后端，仅在测试时使用，可以看[pixi-stage-server](https://github.com/cyberse-sprite/pixi-stage-server)。如果需要适配一个带有验证、流量控制等功能的完整线上系统，带有后端的模式，可以修改api接口基础地址，然后自己实现后端服务。参考[源码结构](https://github.com/cyberse-sprite/pixi-stage/wiki/%E6%BA%90%E7%A0%81%E7%BB%93%E6%9E%84)

## 待办问题

- 由于载入顺序问题，最开始被加载出来的内容没有字体。

- 多语言

- 背景音乐

- 部署在非根目录的方法

- 解决pixijs官方ui里不能切换到输入法输入模式导致无法输入中文的问题