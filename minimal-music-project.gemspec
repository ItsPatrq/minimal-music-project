# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "minimal-music-project"
  spec.version       = "0.1.6"
  spec.authors       = ["Patryk Bieszke"]
  spec.email         = ["bieszke.patryk@gmail.com"]

  spec.summary       = "minimal-music-project is a Jekyll theme for GitHub Pages"
  spec.homepage      = "https://github.com/ItsPatrq/minimal-music-project"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(404\.html|pages|assets|_layouts|_includes|_sass|_data|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.9.0"
end
