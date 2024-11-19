# JSX Support

::: tip
We recommend using JSX syntax when developing Mettle applications, which will greatly improve the user development experience.
:::

The common way we use Mettle is to write HTML-like tags in tag templates. We know that this method is not particularly friendly in terms of code intelligent prompts and code formatting in some scenarios. Therefore, we provide a new coding method, we can use JSX syntax to write Mettle. JSX is a JavaScript syntax extension that allows you to write HTML-like tags in JavaScript files.

## Learn JSX syntax

We can go to [React official documentation](https://react.dev/learn/writing-markup-with-jsx) to learn more about JSX syntax.

## Use

[createMettleApp](/tool/createMettleApp/) The project scaffolding tool has been installed by default. Just select the `mettle-jsx` or `mettle-jsx-apps` template.

After we use `createMettleApp` to build the Mettle project, you will find that `babelPluginMettle` and `babelPluginJsxToMettle` are installed at the same time. This is because we need to use BabelPluginJsxToMettle to convert JSX into a tag template, and then use `babelPluginMettle` to convert the tag template into Virtual DOM.
