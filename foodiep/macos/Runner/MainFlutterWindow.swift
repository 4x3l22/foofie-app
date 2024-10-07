import Cocoa
import FlutterMacOS

class MainFlutterWindow: NSWindow {
  override func awakeFromNib() {
    let flutterView = FlutterView()
    let windowFrame = self.frame
    self.contentView = flutterView
    self.setFrame(windowFrame, display: true)

    RegisterGeneratedPlugins(registry: flutterView)

    super.awakeFromNib()
  }
}
