---
ContentId: 2E6C2F07-5D5A-4F85-B327-0DFD2C1A26E9
DateApproved: 2/22/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Build an advanced Visual Studio Code webview dashboard with Three.js, math.js, and AI-inspired analysis overlays.
---

# Build a 3D research dashboard webview

The [webview API](/api/extension-guides/webview) lets you combine familiar web technologies with VS Code extension logic. This tutorial walks through rendering an advanced dashboard that uses [Three.js](https://threejs.org/) and [math.js](https://mathjs.org/) to visualise data in 3D. The sample mimics an "AI Brain Visualizer" experience and demonstrates techniques for loading large HTML payloads, handling performance telemetry, and exposing complex interactions back to your extension.

> **Prerequisites:** Complete the steps in [Your First Extension](/api/get-started/your-first-extension) so that you have an extension project folder. The snippets below assume a TypeScript project, but the same structure works for JavaScript.

## Register the dashboard command

Update your extension `package.json` to contribute a command that opens the visualizer webview:

```json
{
  "activationEvents": [
    "onCommand:brainVisualizer.start"
  ],
  "contributes": {
    "commands": [
      {
        "command": "brainVisualizer.start",
        "title": "Open AI Brain Visualizer"
      }
    ]
  }
}
```

## Render the dashboard content

The following activation logic creates a webview panel, loads the dashboard HTML from disk, injects a security nonce, and enables scripts so that Three.js can render:

```ts
import * as vscode from 'vscode';
import { readFileSync } from 'fs';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('brainVisualizer.start', () => {
    const panel = vscode.window.createWebviewPanel(
      'brainVisualizer',
      'AI Brain Visualizer Pro',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true
      }
    );

    const htmlPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'brainVisualizer.html');
    let html = readFileSync(htmlPath.fsPath, 'utf8');
    const nonce = getNonce();

    html = html.replace(/{{nonce}}/g, nonce);
    panel.webview.html = html;
  });

  context.subscriptions.push(disposable);
}

function getNonce(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < 32; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}
```

The helper replaces the `{{nonce}}` placeholder used in the HTML template. This keeps the webview's [content security policy](https://code.visualstudio.com/api/extension-guides/webview#content-security-policy) strict while still allowing inline scripts.

## Create the webview markup

Copy the sample HTML from [`api/extension-guides/samples/ai-brain-visualizer-webview.html`](./samples/ai-brain-visualizer-webview.html) into a new `media/brainVisualizer.html` file inside your extension project. The markup already includes:

- A `<meta http-equiv="Content-Security-Policy">` tag that restricts remote resources to `cdnjs.cloudflare.com` and your API endpoint.
- `nonce="{{nonce}}"` attributes on every `<script>` tag so that the TypeScript helper can inject the runtime nonce.
- Extensive styling that showcases glassmorphism panels, control buttons, and metric tiles.

> **Tip:** Replace `https://api.example.com/v1/completion` in the sample with the endpoint you call from your extension. You can also host Three.js and math.js locally and adjust the CSP accordingly.

## Explore the dashboard

When you run **Brain Visualizer: Start** from the Command Palette, the webview renders the following experience:

- A 3D knowledge graph powered by `THREE.WebGLRenderer`, orbit controls, and node clustering logic.
- Interactive chat-style panels that log status updates and synthetic responses returned by the `EnhancedScientificAIAPIClient` class.
- A side panel packed with configuration controls, performance overlays, export helpers, and collaboration affordances.

Because the sample is pure HTML, CSS, and JavaScript, you can progressively enhance or simplify any portion. Use `vscode.postMessage` if you want to send telemetry back to the extension host, or expose commands that drive the mock API client.

## Next steps

- Connect the dashboard to real extension data by replacing the offline API client with calls to your own services.
- Theme the UI using [webview theme tokens](/api/references/theme-color) so that it adapts to VS Code themes.
- Split large scripts into separate files and load them with `webview.asWebviewUri` if you prefer to avoid inline scripts entirely.

This sample should give you a head start on building ambitious webview dashboards while following VS Code's security and performance guidelines.
