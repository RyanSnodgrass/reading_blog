require 'mini_magick'
require 'pathname'

class ImageResizer
  # Define image variants: name => [width, height, quality]
  VARIANTS = {
    thumb: [400, 300, 90],      # For article cards (1x)
    thumb_2x: [800, 600, 90],   # For article cards (2x/high-DPI)
    md: [800, 600, 90],         # For article view (1x)
    md_2x: [1600, 1200, 90]     # For article view (2x/high-DPI)
  }.freeze

  def self.resize_images(build_dir)
    new(build_dir).process
  end

  def initialize(build_dir)
    @build_dir = Pathname.new(build_dir)
    @extensions = %w[jpg jpeg png]
  end

  def process
    image_files.each do |image_path|
      VARIANTS.each do |variant_name, (width, height, quality)|
        generate_variant(image_path, variant_name, width, height, quality)
      end
    end
  end

  private

  def image_files
    @build_dir.glob("**/*.{#{@extensions.join(',')}}")
      .reject { |path| path.basename.to_s.include?('-thumb') || path.basename.to_s.include?('-md') }
  end

  def generate_variant(original_path, variant_name, width, height, quality)
    variant_path = variant_filename(original_path, variant_name)

    # Skip if variant already exists
    return if variant_path.exist?

    begin
      image = MiniMagick::Image.open(original_path.to_s)

      # Resize to fit within dimensions while maintaining aspect ratio (no cropping)
      image.resize "#{width}x#{height}"

      # Set quality for JPG
      image.quality quality.to_s if original_path.extname.downcase == '.jpg'

      image.write variant_path.to_s
      puts "Generated: #{variant_path.relative_path_from(@build_dir)}"
    rescue => e
      puts "Error generating #{variant_name} for #{original_path}: #{e.message}"
    end
  end

  def variant_filename(original_path, variant_name)
    basename = original_path.basename(original_path.extname).to_s
    extension = original_path.extname
    original_path.parent.join("#{basename}-#{variant_name}#{extension}")
  end
end
