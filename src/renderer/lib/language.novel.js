exports.registerLanguage = function(monaco) {
  // Register a new language
  monaco.languages.register({ id: 'novel' });

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider('novel', {
    tokenizer: {
      root: [
        [/hello/, "role"],
      ]
    }
  });

  // Register a completion item provider for the new language
  monaco.languages.registerCompletionItemProvider('novel', {
    provideCompletionItems: () => {
      var suggestions = [{
        label: 'simpleText',
        kind: monaco.languages.CompletionItemKind.Text,
        insertText: 'simpleText'
      }, {
        label: 'testing',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'testing(${1:condition})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }, {
        label: 'ifelse',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
          'if (${1:condition}) {',
          '\t$0',
          '} else {',
          '\t',
          '}'
        ].join('\n'),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'If-Else Statement'
      }];
      return { suggestions: suggestions };
    }
  });

   // Define a new theme that contains only rules that match this language
  monaco.editor.defineTheme('myCoolTheme', {
    base: 'vs',
    inherit: false,
    rules: [
      { token: 'role', foreground: 'ff0000', fontStyle: 'bold' },
    ]
  });
}