# PixiStage

简单的线上同人展系统。

PixiJS | Vue | TypeScript | Naive UI

## 仓库地址

国外Github（优先更新） [pixi-stage](https://github.com/cyberse-sprite/pixi-stage)

国内Gitee（不定时同步） [pixi-stage](https://gitee.com/cyberse-sprite/pixi-stage)

## 预览效果

国外访问Github [pixi-stage](https://cyberse-sprite.github.io/pixi-stage)

## 开始

### 修改资源

只想画画素材，摆摆图块，参考[修改资源](https://github.com/cyberse-sprite/pixi-stage/wiki/%E4%BF%AE%E6%94%B9%E5%9C%B0%E5%9B%BE)。

### 后端

一个简单的后端，仅在测试时使用。

国外 Github [pixi-stage-server](https://github.com/cyberse-sprite/pixi-stage-server)。

### 文档

国外Github [源码结构](https://github.com/cyberse-sprite/pixi-stage/wiki/%E6%BA%90%E7%A0%81%E7%BB%93%E6%9E%84)

## 使用资源

使用到的字体[Cubic-11](https://github.com/ACh-K/Cubic-11)

## 待办问题

- [ ] 由于载入顺序问题，最开始被加载出来的内容没有字体。

- [ ] 多语言

- [ ] 背景音乐

- [X] 部署在非根目录的方法

- [ ] 解决pixijs官方ui里不能切换到输入法输入模式导致无法输入中文的问题（暂时用浏览器输入框替代）

- [ ] 截图的时候信息提示还是会被截图

## 念念碎

在最初的构想中，这个系统只为一个一次性的、小型的活动设计。当时做得比较简单，仅仅使用了PixiJS绘制图形，记事本手搓页面，后端使用php。

2022年活动办完，有了一些经验，开始构思一个更通用的系统，于是就有了这个项目。虽然想要开发一个功能更全面的系统，但代码好写，设计却不好做。静态页面的部分几天就写完了，其余内容要考虑受众、平台、荷载、安全等等问题，本人没对这些没什么经验。

毕竟现在已经有相对成熟的平台去做了，这个项目最后定位为一个静态页面项目。现在主体部分可以说是完成了，接下来考虑再做一个资源编辑器，等有时间有需求再说吧。