import theme from '@theme/theme';

describe('Garante que os valores essenciais do theme estão definidos corretamente', () => {

  test('nome das fontes -> case sensitive', () => {

    expect(theme.fonts.default).toEqual('Lato-Regular');
    expect(theme.fonts.defaultBold).toEqual('Lato-Bold');
    expect(theme.fonts.title).toEqual('Ubuntu-Regular');
    expect(theme.fonts.titleBold).toEqual('Ubuntu-Bold');

  });

  test('cores primárias e secundárias', () => {

    expect(theme.colors.primary.base).toEqual('#FFBD00');
    expect(theme.colors.primary.darker).toEqual('#FAA300');
    expect(theme.colors.primary.lighter).toEqual('#FFDE50');
    expect(theme.colors.secondary.base).toEqual('#2B363C');
    expect(theme.colors.secondary.lighter).toEqual('#58636a');

  });

});
