import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PreviewCard } from "@/components/preview-card";
import { getTextColor } from "@/lib/color-utils";

interface DesignPreviewProps {
  tokens: any;
  selectedRadius: string;
  selectedShadow: string;
}

export function DesignPreview({
  tokens,
  selectedRadius,
  selectedShadow,
}: DesignPreviewProps) {
  return (
    <PreviewCard>
      <div className="space-y-4">
        <h3
          style={{
            color: tokens.colors.foreground,
            fontFamily: tokens.typography?.fontFamily,
            fontSize: tokens.typography?.heading?.h3?.size,
            fontWeight: tokens.typography?.heading?.h3?.weight,
            lineHeight: tokens.typography?.heading?.h3?.lineHeight,
          }}
        >
          Preview
        </h3>
        <div className="grid gap-4">
          <div
            className="h-20"
            style={{
              borderRadius: tokens.radius[selectedRadius],
              backgroundColor: tokens.colors.primary[500],
              boxShadow: tokens.shadows[selectedShadow],
            }}
          />
          <Button
            className="w-full"
            style={{
              borderRadius: tokens.radius[selectedRadius],
              boxShadow: tokens.shadows[selectedShadow],
              fontFamily: tokens.typography?.fontFamily,
              fontSize: tokens.typography?.button?.size,
              fontWeight: tokens.typography?.button?.weight,
              lineHeight: tokens.typography?.button?.lineHeight,
            }}
          >
            Button Example
          </Button>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Input field"
                style={{
                  borderRadius: tokens.radius[selectedRadius],
                  boxShadow: tokens.shadows[selectedShadow],
                  fontFamily: tokens.typography?.fontFamily,
                  fontSize: tokens.typography?.input?.size,
                  fontWeight: tokens.typography?.input?.weight,
                  lineHeight: tokens.typography?.input?.lineHeight,
                }}
              />
              <textarea
                className="flex h-10 items-center p-3 text-sm"
                style={{
                  borderRadius: tokens.radius[selectedRadius],
                  backgroundColor: tokens.colors.muted[200],
                  color: getTextColor(
                    tokens.colors.muted[200],
                    tokens.colors.foreground,
                  ),
                  boxShadow: tokens.shadows[selectedShadow],
                  fontFamily: tokens.typography?.fontFamily,
                  fontSize: tokens.typography?.input?.size,
                  fontWeight: tokens.typography?.input?.weight,
                  lineHeight: tokens.typography?.input?.lineHeight,
                }}
              >
                Textarea
              </textarea>
            </div>
          </div>
          <div className="space-y-2">
            <div
              className="border p-4 shadow-sm"
              style={{
                borderRadius: tokens.radius[selectedRadius],
                backgroundColor: tokens.colors.card,
                color: getTextColor(
                  tokens.colors.card,
                  tokens.colors.foreground,
                ),
                boxShadow: tokens.shadows[selectedShadow],
              }}
            >
              <p
                className="text-sm"
                style={{
                  fontFamily: tokens.typography?.fontFamily,
                  fontSize: tokens.typography?.body?.size,
                  fontWeight: tokens.typography?.body?.weight,
                  lineHeight: tokens.typography?.body?.lineHeight,
                }}
              >
                Card content with custom radius and shadow
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p
              className="text-sm font-medium"
              style={{
                fontFamily: tokens.typography?.fontFamily,
                fontSize: tokens.typography?.label?.size,
                fontWeight: tokens.typography?.label?.weight || "medium",
                lineHeight: tokens.typography?.label?.lineHeight,
              }}
            >
              Badges & Tags
            </p>
            <div className="flex flex-wrap gap-2">
              <span
                className="inline-flex items-center px-2 py-1 text-xs"
                style={{
                  borderRadius: tokens.radius[selectedRadius],
                  backgroundColor: tokens.colors.primary[500],
                  color: getTextColor(
                    tokens.colors.primary[500],
                    tokens.colors.foreground,
                  ),
                  boxShadow: tokens.shadows[selectedShadow],
                  fontFamily: tokens.typography?.fontFamily,
                  fontSize: tokens.typography?.badge?.size,
                  fontWeight: tokens.typography?.badge?.weight,
                  lineHeight: tokens.typography?.badge?.lineHeight,
                }}
              >
                Primary
              </span>
              <span
                className="inline-flex items-center px-2 py-1 text-xs"
                style={{
                  borderRadius: tokens.radius[selectedRadius],
                  backgroundColor: tokens.colors.secondary[500],
                  color: getTextColor(
                    tokens.colors.secondary[500],
                    tokens.colors.foreground,
                  ),
                  boxShadow: tokens.shadows[selectedShadow],
                  fontFamily: tokens.typography?.fontFamily,
                  fontSize: tokens.typography?.badge?.size,
                  fontWeight: tokens.typography?.badge?.weight,
                  lineHeight: tokens.typography?.badge?.lineHeight,
                }}
              >
                Secondary
              </span>
              <span
                className="inline-flex items-center px-2 py-1 text-xs"
                style={{
                  borderRadius: tokens.radius[selectedRadius],
                  backgroundColor: tokens.colors.accent[500],
                  color: getTextColor(
                    tokens.colors.accent[500],
                    tokens.colors.foreground,
                  ),
                  boxShadow: tokens.shadows[selectedShadow],
                  fontFamily: tokens.typography?.fontFamily,
                  fontSize: tokens.typography?.badge?.size,
                  fontWeight: tokens.typography?.badge?.weight,
                  lineHeight: tokens.typography?.badge?.lineHeight,
                }}
              >
                Accent
              </span>
              <span
                className="inline-flex items-center px-2 py-1 text-xs"
                style={{
                  borderRadius: tokens.radius[selectedRadius],
                  backgroundColor: tokens.colors.muted[500],
                  color: getTextColor(
                    tokens.colors.muted[500],
                    tokens.colors.foreground,
                  ),
                  boxShadow: tokens.shadows[selectedShadow],
                  fontFamily: tokens.typography?.fontFamily,
                  fontSize: tokens.typography?.badge?.size,
                  fontWeight: tokens.typography?.badge?.weight,
                  lineHeight: tokens.typography?.badge?.lineHeight,
                }}
              >
                Muted
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p
              className="text-sm font-medium"
              style={{
                fontFamily: tokens.typography?.fontFamily,
                fontSize: tokens.typography?.label?.size,
                fontWeight: tokens.typography?.label?.weight || "medium",
                lineHeight: tokens.typography?.label?.lineHeight,
              }}
            >
              Alert
            </p>
            <div
              className="p-3 text-sm"
              style={{
                borderRadius: tokens.radius[selectedRadius],
                backgroundColor: tokens.colors.muted[100],
                color: tokens.colors.foreground,
                boxShadow: tokens.shadows[selectedShadow],
                fontFamily: tokens.typography?.fontFamily,
                fontSize: tokens.typography?.body?.size,
                fontWeight: tokens.typography?.body?.weight,
                lineHeight: tokens.typography?.body?.lineHeight,
              }}
            >
              This is an alert message
            </div>
          </div>
        </div>
      </div>
    </PreviewCard>
  );
}
