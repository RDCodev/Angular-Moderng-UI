import { afterNextRender, AfterRenderPhase, ElementRef, inject, Renderer2, signal } from "@angular/core";

 export function injectDimensions() {
  
  const renderer = inject(Renderer2);
  const el = inject<ElementRef<HTMLElement>>(ElementRef);
  const size = signal<{ [klass: string]: number | boolean}>({
    width: 0,
    height: 0,
    mounted: false
  })

  afterNextRender(
    () => {
      const { width, height } = el.nativeElement.getBoundingClientRect();
      size.set({ width, height, mounted: true })
    },
    {
      phase: AfterRenderPhase.Read
    }
  )

  return size;
 }