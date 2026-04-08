import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { Slot } from "@radix-ui/react-slot";

function Collapsible({
  asChild,
  ...props
}: CollapsiblePrimitive.Root.Props & { asChild?: boolean }) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      render={asChild ? <Slot /> : undefined}
      {...props}
    />
  );
}

function CollapsibleTrigger({
  asChild,
  ...props
}: CollapsiblePrimitive.Trigger.Props & { asChild?: boolean }) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      render={asChild ? <Slot /> : undefined}
      {...props}
    />
  );
}

function CollapsibleContent({
  asChild,
  ...props
}: CollapsiblePrimitive.Panel.Props & { asChild?: boolean }) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      render={asChild ? <Slot /> : undefined}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
